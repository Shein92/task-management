import { Dispatch } from "redux";
import { setApplicationLoader } from "../redux/application";
import { addTaskDescription, createNewTask, deleteTask, deleteTaskDescription, setSelectedTask, updateTaskTitle } from "../redux/tasks/actions";
import { sleep } from "./../../util/sleep";

export const createTask = (columnId: string, title: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setApplicationLoader(false));
    dispatch(createNewTask(columnId, title));
  };
};

export const deleteTaskById = (columnId: string, taskId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setSelectedTask(null, null));
    dispatch(deleteTask(columnId, taskId));
    dispatch(setApplicationLoader(false));
  };
};

export const changeTaskTitle = (
  columnId: string,
  taskId: string,
  title: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(updateTaskTitle(columnId, taskId, title));
    dispatch(setApplicationLoader(false));
  };
};
export const changeTaskDescription = (
  columnId: string,
  taskId: string,
  text: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setApplicationLoader(false));
    dispatch(addTaskDescription(columnId, taskId, text));
  };
};
export const deleteDescription = (
  columnId: string,
  taskId: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setApplicationLoader(false));
    dispatch(deleteTaskDescription(columnId, taskId));
  };
};
