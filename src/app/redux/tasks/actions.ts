import {
  DELETE_COLUMN_TASK,
  DELETE_TASK,
  DELETE_TASK_DESCRIPTION,
  ITask,
  SET_NEW_TASK,
  SET_NEW_TASK_COLUMN,
  SET_NEW_TASK_ORDER,
  SET_SELECTED_TASK,
  SET_TASK_DESCRIPTION,
  SET_TASK_IN_NEW_COLUMN,
  UPDATE_TASK_TITLE_BY_ID,
} from "./types";

export type ActionsType =
  | ReturnType<typeof setNewTaskOrderInSameColumn>
  | ReturnType<typeof createNewTaskColumn>
  | ReturnType<typeof setTaskInNewColumn>
  | ReturnType<typeof createNewTask>
  | ReturnType<typeof deleteTask>
  | ReturnType<typeof deleteColumnTasks>
  | ReturnType<typeof updateTaskTitle>
  | ReturnType<typeof addTaskDescription>
  | ReturnType<typeof deleteTaskDescription>
  | ReturnType<typeof setSelectedTask>;

export const createNewTaskColumn = (columnId: string) => {
  return { type: SET_NEW_TASK_COLUMN, columnId } as const;
};

export const setNewTaskOrderInSameColumn = (
  sourceIndex: number,
  destinationIndex: number,
  columnId: string
) => {
  return {
    type: SET_NEW_TASK_ORDER,
    payload: { sourceIndex, destinationIndex, columnId },
  } as const;
};

export const setTaskInNewColumn = (
  startColumnId: string,
  destinationColumnId: string,
  sourceIndex: number,
  destinationIndex: number
) => {
  return {
    type: SET_TASK_IN_NEW_COLUMN,
    payload: {
      startColumnId,
      destinationColumnId,
      sourceIndex,
      destinationIndex,
    },
  } as const;
};

export const createNewTask = (columnId: string, title: string) => {
  return { type: SET_NEW_TASK, payload: { columnId, title } } as const;
};

export const deleteTask = (columnId: string, taskId: string) => {
  return { type: DELETE_TASK, payload: { columnId, taskId } } as const;
};

export const updateTaskTitle = (
  columnId: string,
  taskId: string,
  title: string
) => {
  return {
    type: UPDATE_TASK_TITLE_BY_ID,
    payload: { columnId, taskId, title },
  } as const;
};

export const deleteColumnTasks = (columnId: string) => {
  return { type: DELETE_COLUMN_TASK, columnId } as const;
};

export const addTaskDescription = (
  columnId: string,
  taskId: string,
  text: string
) => {
  return {
    type: SET_TASK_DESCRIPTION,
    payload: { columnId, taskId, text },
  } as const;
};

export const deleteTaskDescription = (columnId: string, taskId: string) => {
  return {
    type: DELETE_TASK_DESCRIPTION,
    payload: { columnId, taskId },
  } as const;
};

export const setSelectedTask = (task: ITask | null, columnId: string | null) => {
  return { type: SET_SELECTED_TASK, payload: {task, columnId} } as const;
};
