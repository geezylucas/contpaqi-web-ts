import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, WebStorage } from "redux-persist";
import { createAction } from "@reduxjs/toolkit";

import documentReducer, { DocumentState } from "./documentSlice";
import userReducer, { UserState } from "./userSlice";

// The top-level state object
export interface ApplicationState {
  document: DocumentState;
  user: UserState;
}

const combinedReducers: Reducer<ApplicationState, AnyAction> = combineReducers<
  ApplicationState,
  AnyAction
>({
  document: documentReducer,
  user: userReducer,
});

const LOGOUT: string = "user/logout";

export const logout = createAction<undefined>(LOGOUT);

const rootReducer: Reducer<ApplicationState, AnyAction> = (
  state: ApplicationState | undefined,
  action: AnyAction
): ApplicationState => {
  if (action.type === "user/logout") {
    // check for action type
    state = undefined;
  }
  return combinedReducers(state, action);
};

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

export default persistReducer<ApplicationState, AnyAction>(
  persistConfig,
  rootReducer
);
