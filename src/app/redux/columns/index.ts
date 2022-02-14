import { ActionsType } from "./actions";
import {
  DELETE_COLUMN,
  IColumnState,
  SET_NEW_COLUMN,
  SET_NEW_COLUMN_ORDER,
  SET_NEW_COLUMN_TITLE,
} from "./types";

const initialState: IColumnState = {
  columns: [
    {
      id: "11",
      title: "Todo",
    },
    {
      id: "21",
      title: "In progress",
    },
    {
      id: "31",
      title: "Review",
    },
    {
      id: "41",
      title: "Completed",
    },
  ],
};

export const columnReducer = (
  state: IColumnState = initialState,
  action: ActionsType
): IColumnState => {
  switch (action.type) {
    case SET_NEW_COLUMN: {
      const column = {
        id: action.payload.columnId,
        title: action.payload.title,
      };
      const columns = [...state.columns, column];
      return { ...state, columns: [...columns] };
    }
    case SET_NEW_COLUMN_ORDER: {
      let columns = [...state.columns];
      const draggableColumn = columns.splice(+action.payload.orderId, 1)[0];
      columns.splice(+action.payload.destinationIndex, 0, draggableColumn);
      return { ...state, columns: [...columns] };
    }
    case SET_NEW_COLUMN_TITLE: {
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.columnId
            ? { ...column, title: action.payload.title }
            : column
        ),
      };
    }
    case DELETE_COLUMN: {
      return {
        ...state,
        columns: state.columns.filter(
          (column) => column.id !== action.columnId
        ),
      };
    }
    default: {
      return state;
    }
  }
};
