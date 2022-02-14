import { DELETE_COLUMN, SET_NEW_COLUMN, SET_NEW_COLUMN_ORDER, SET_NEW_COLUMN_TITLE } from "./types";

export type ActionsType =
  | ReturnType<typeof setNewColumn>
  | ReturnType<typeof setNewColumnOrder>
  | ReturnType<typeof changeTitle>
  | ReturnType<typeof deleteColumn>;

export const setNewColumn = (columnId: string, title: string) => {
  return {
    type: SET_NEW_COLUMN,
    payload: {
      title,
      columnId,
    },
  } as const;
};

export const setNewColumnOrder = (
  orderId: string | number,
  destinationIndex: string | number
) => {
  return {
    type: SET_NEW_COLUMN_ORDER,
    payload: { orderId, destinationIndex },
  } as const;
};

export const changeTitle = (columnId: string, title: string) => {
  return { type: SET_NEW_COLUMN_TITLE, payload: { columnId, title } } as const;
};

export const deleteColumn = (columnId: string) => {
  return { type: DELETE_COLUMN, columnId } as const;
};
