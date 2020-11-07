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
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
