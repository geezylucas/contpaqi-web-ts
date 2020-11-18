import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  token?: string;
}

export const initialState: IUserState = {
  token: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      // From here we can take action only at this "user" state
      // But, as we have taken care of this particular "logout" action
      // in rootReducer, we can use it to CLEAR the complete Redux Store's state
    },
  },
});

export const { setToken, logout } = userSlice.actions;

export default userSlice.reducer;
