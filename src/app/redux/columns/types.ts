export const SET_NEW_COLUMN = "columns/SET_NEW_COLUMN";
export const SET_NEW_COLUMN_ORDER = "columns/SET_NEW_COLUMN_ORDER";
export const SET_NEW_COLUMN_TITLE = "columns/SET_NEW_COLUMN_TITLE";
export const DELETE_COLUMN = "columns/DELETE_COLUMN";

export interface IColumn {
  id: string;
  title: string;
}

export interface IColumnState {
  columns: IColumn[];
}