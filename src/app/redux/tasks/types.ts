export const SET_NEW_TASK_ORDER = "tasks/SET_NEW_TASK_ORDER";
export const SET_TASK_IN_NEW_COLUMN = "tasks/SET_TASK_IN_NEW_COLUMN";
export const SET_NEW_TASK_COLUMN = "tasks/SET_NEW_TASK_COLUMN";
export const SET_NEW_TASK = "tasks/SET_NEW_TASK";
export const DELETE_TASK = "tasks/DELETE_TASK";
export const DELETE_COLUMN_TASK = "tasks/DELETE_COLUMN_TASK";
export const UPDATE_TASK_TITLE_BY_ID = "tasks/UPDATE_TASK_TITLE_BY_ID";
export const SET_TASK_DESCRIPTION = "tasks/SET_TASK_DESCRIPTION";
export const DELETE_TASK_DESCRIPTION = "tasks/DELETE_TASK_DESCRIPTION";
export const SET_SELECTED_TASK = "tasks/SET_SELECTED_TASK";

export interface ITask {
  id: string;
  title: string;
  description: string | null;
}

export interface ISelectedTask extends ITask{
  columnId: string | null;
}

export interface ITaskState {
  tasks: {
    [key: string]: ITask[];
  };
  selectedTask: ISelectedTask | null;
}