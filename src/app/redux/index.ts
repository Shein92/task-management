import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { applicationReducer } from "./application";
import { columnReducer } from "./columns";
import { taskReducer } from "./tasks";

const rootReducer = combineReducers({
  columns: columnReducer,
  tasks: taskReducer,
  app: applicationReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootStateType = ReturnType<typeof rootReducer>