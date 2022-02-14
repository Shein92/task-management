import React, { FC, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import EditableTitle from "../EditableTitle";
import { useDispatch } from "react-redux";
import { changeTaskTitle, deleteTaskById } from "../../app/thunk/tasks";
import { Container } from "./style";
import { ITask } from "../../app/redux/tasks/types";
import { setSelectedTask } from "../../app/redux/tasks/actions";

interface ITaskComponent {
  task: ITask;
  index: number;
  columnId: string;
}

const TaskComponent: FC<ITaskComponent> = ({ task, columnId, index }) => {
  const dispatch = useDispatch();

  const changeTaskTitleHandler = useCallback(
    (title: string) => {
      if (title === task.title) {
        return;
      }
      dispatch(changeTaskTitle(columnId, task.id, title));
    },
    [columnId, dispatch, task.id, task.title]
  );

  const deleteTask = useCallback(() => {
    dispatch(deleteTaskById(columnId, task.id));
  }, [columnId, dispatch, task.id]);

  const selectedTaskHandler = useCallback(() => {
    dispatch(setSelectedTask(task, columnId));
  }, [columnId, dispatch, task]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onClick={selectedTaskHandler}
        >
          <EditableTitle
            value={task.title}
            onChange={changeTaskTitleHandler}
            deleteItem={deleteTask}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default TaskComponent;
