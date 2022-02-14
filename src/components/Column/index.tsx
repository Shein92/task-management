import React, { FC, useCallback } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { IColumn } from "../../app/redux/columns/types";
import { ITask } from "../../app/redux/tasks/types";
import {
  changeColumnTitleById,
  deleteColumnById,
} from "../../app/thunk/columns";
import { createTask } from "../../app/thunk/tasks";
import AddItem from "../AddItem";
import EditableTitle from "../EditableTitle";
import Task from "../Task";
import { Container, TaskList } from "./style";

interface IColumnComponent {
  tasks: ITask[];
  column: IColumn;
  index: number;
}

const ColumnComponent: FC<IColumnComponent> = ({ column, tasks, index }) => {
  console.log('columnIndex', index);
  const dispatch = useDispatch();

  const createTaskHandler = useCallback(
    (title: string) => {
      dispatch(createTask(column.id, title));
    },
    [column.id, dispatch]
  );

  const changeColumnTitle = useCallback(
    (title: string) => {
      if (title === column.title) {
        return;
      }
      dispatch(changeColumnTitleById(column.id, title));
    },
    [column.id, column.title, dispatch]
  );

  const deleteColumn = useCallback(() => {
    dispatch(deleteColumnById(column.id));
  }, [column.id, dispatch]);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <EditableTitle
            value={column.title}
            onChange={changeColumnTitle}
            deleteItem={deleteColumn}
            isColumnTitle={true}
          />
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={column.id}
                  />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
          <AddItem addItem={createTaskHandler} />
        </Container>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
