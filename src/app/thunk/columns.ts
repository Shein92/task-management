import { Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";
import { setApplicationLoader } from "../redux/application";
import { changeTitle, deleteColumn, setNewColumn } from "../redux/columns/actions";
import { createNewTaskColumn, deleteColumnTasks } from "../redux/tasks/actions";
import { sleep } from "./../../util/sleep";

export const createColumn = (title: string) => {
  return async (dispatch: Dispatch) => {
    const columnId = uuidv4();
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setApplicationLoader(false));
    dispatch(createNewTaskColumn(columnId));
    dispatch(setNewColumn(columnId, title));
  };
};

export const changeColumnTitleById = (columnId: string, title: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setApplicationLoader(false));
    dispatch(changeTitle(columnId, title));
  };
};

export const deleteColumnById = (columnId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setApplicationLoader(true));
    await sleep(2000);
    dispatch(setApplicationLoader(false));
    dispatch(deleteColumn(columnId));
    dispatch(deleteColumnTasks(columnId));
  };
};
