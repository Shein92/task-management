import React, { useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../app/redux";
import { setNewColumnOrder } from "../../app/redux/columns/actions";
import { IColumn } from "../../app/redux/columns/types";
import { setNewTaskOrderInSameColumn, setTaskInNewColumn } from "../../app/redux/tasks/actions";
import { ISelectedTask, ITask } from "../../app/redux/tasks/types";
import { createColumn } from "../../app/thunk/columns";
import AddItem from "../../components/AddItem";
import ColumnComponent from "../../components/Column";
import Loader from "../../components/Loader";
import TaskPopup from "../../components/TaskPopup";
import { Container } from "./style";

const Main = () => {
  const dispatch = useDispatch();

  const selectedTask = useSelector<RootStateType, ISelectedTask | null>(state => state.tasks.selectedTask);

  const columns = useSelector<RootStateType, IColumn[]>(
    (state) => state.columns.columns
  );
  const tasks = useSelector<RootStateType, { [key: string]: ITask[] }>(
    (state) => state.tasks.tasks
  );
  const loader = useSelector<RootStateType, boolean>(
    (state) => state.app.isLoading
  );

  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (type === "column") {
      console.log(source.index, destination.index);
      dispatch(setNewColumnOrder(source.index, destination.index));
      return;
    }
    const start = columns.find((item) => item.id === source.droppableId);
    const finish = columns.find((item) => item.id === destination.droppableId);

    if (start === finish) {
      const id = columns.find((item) => item.id === source.droppableId)?.id;
      if (id)
        dispatch(
          setNewTaskOrderInSameColumn(source.index, destination.index, id)
        );
      return;
    }

    const startId = columns.find((item) => item.id === source.droppableId)?.id;
    const destinationId = columns.find(
      (item) => item.id === destination.droppableId
    )?.id;
    if (startId && destinationId)
      dispatch(
        setTaskInNewColumn(
          startId,
          destinationId,
          source.index,
          destination.index
        )
      );
  }, [columns, dispatch]);

  const createColumnHandler = useCallback((title: string) => {
    dispatch(createColumn(title));
  }, [dispatch]);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.droppableProps} >
              {columns.map((column, index) => {
                return (
                  <ColumnComponent
                    key={column.id}
                    column={column}
                    index={index}
                    tasks={tasks[column.id]}
                    
                  />
                );
              })}

              <AddItem addItem={createColumnHandler}/>
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
      {loader && <Loader />}
      {selectedTask ? <TaskPopup task={selectedTask}/> : null}
    </>
  );
};

export default Main;
