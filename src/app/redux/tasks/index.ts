import { v4 as uuidv4 } from "uuid";
import { ActionsType } from "./actions";
import {
  DELETE_COLUMN_TASK,
  DELETE_TASK,
  DELETE_TASK_DESCRIPTION,
  ITaskState,
  SET_NEW_TASK,
  SET_NEW_TASK_COLUMN,
  SET_NEW_TASK_ORDER,
  SET_SELECTED_TASK,
  SET_TASK_DESCRIPTION,
  SET_TASK_IN_NEW_COLUMN,
  UPDATE_TASK_TITLE_BY_ID,
} from "./types";

const initialState: ITaskState = {
  tasks: {
    "11": [
      { id: uuidv4(), title: "title for task 1", description: "qwerty" },
      { id: uuidv4(), title: "title for task-2", description: null },
    ],
    "21": [{ id: uuidv4(), title: "title for task-3", description: "ytrewq" }],
    "31": [],
    "41": [{ id: uuidv4(), title: "title for task-4", description: null }],
  },
  selectedTask: null,
};

export const taskReducer = (
  state: ITaskState = initialState,
  action: ActionsType
): ITaskState => {
  switch (action.type) {
    case SET_NEW_TASK: {
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: null,
      };
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: [
            ...state.tasks[action.payload.columnId],
            newTask,
          ],
        },
      };
    }
    case SET_NEW_TASK_COLUMN: {
      return { ...state, tasks: { ...state.tasks, [action.columnId]: [] } };
    }
    case SET_NEW_TASK_ORDER: {
      let searchTaskArray = [...state.tasks[action.payload.columnId]];
      let draggableTask = searchTaskArray.splice(
        action.payload.sourceIndex,
        1
      )[0];
      searchTaskArray.splice(action.payload.destinationIndex, 0, draggableTask);
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: [...searchTaskArray],
        },
      };
    }
    case SET_TASK_IN_NEW_COLUMN: {
      let startTaskArray = [...state.tasks[action.payload.startColumnId]];
      let destinationTaskArray = [
        ...state.tasks[action.payload.destinationColumnId],
      ];

      let draggableTask = startTaskArray.splice(
        action.payload.sourceIndex,
        1
      )[0];
      destinationTaskArray.splice(
        action.payload.destinationIndex,
        0,
        draggableTask
      );
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.startColumnId]: [...startTaskArray],
          [action.payload.destinationColumnId]: [...destinationTaskArray],
        },
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: state.tasks[
            action.payload.columnId
          ].filter((task) => task.id !== action.payload.taskId),
        },
      };
    }
    case DELETE_COLUMN_TASK: {
      const copy = { ...state.tasks };
      delete copy[action.columnId];
      return { ...state, tasks: { ...copy } };
    }
    case UPDATE_TASK_TITLE_BY_ID: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: state.tasks[action.payload.columnId].map(
            (task) =>
              task.id === action.payload.taskId
                ? { ...task, title: action.payload.title }
                : task
          ),
        },
      };
    }
    case SET_TASK_DESCRIPTION: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: state.tasks[action.payload.columnId].map(
            (task) =>
              task.id === action.payload.taskId
                ? { ...task, description: action.payload.text }
                : task
          ),
        },
        selectedTask: {
          ...state.selectedTask!,
          description: action.payload.text,
        },
      };
    }
    case DELETE_TASK_DESCRIPTION: {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.columnId]: state.tasks[action.payload.columnId].map(
            (task) =>
              task.id === action.payload.taskId
                ? { ...task, description: null }
                : task
          ),
        },
      };
    }
    case SET_SELECTED_TASK: {
      const selectedTask =
        action.payload.task !== null
          ? { ...action.payload.task, columnId: action.payload.columnId }
          : null;
      return { ...state, selectedTask: selectedTask };
    }
    default: {
      return state;
    }
  }
};
