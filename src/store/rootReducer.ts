import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, WebStorage } from "redux-persist";
import documentReducer, { IDocumentState } from "./documentSlice";
import userReducer, { IUserState } from "./userSlice";

// The top-level state object
export interface IApplicationState {
  document: IDocumentState;
  user: IUserState;
}

const combinedReducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  document: documentReducer,
  user: userReducer,
});

const rootReducer = (
  state: IApplicationState | undefined,
  action: AnyAction
) => {
  if (action.type === "user/logout") {
    // check for action type
    state = undefined;
  }
  return combinedReducers(state, action);
};

// Config persist
type PersistConfigType = {
  key: string;
  version: number;
  storage: WebStorage;
};

const persistConfig: PersistConfigType = {
  key: "root",
  version: 1,
  storage,
};

export default persistReducer<IApplicationState>(persistConfig, rootReducer);
