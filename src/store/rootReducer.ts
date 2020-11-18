import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, WebStorage } from "redux-persist";
import { createAction } from "@reduxjs/toolkit";
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

// LOGOUT Action
const LOGOUT: string = "user/logout";

export const logOut = createAction<undefined>(LOGOUT);

// LOGOUT Reducer
const rootReducer: Reducer<IApplicationState> = (
  state: IApplicationState | undefined,
  action: AnyAction
): IApplicationState => {
  if (action.type === "user/logout") {
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
