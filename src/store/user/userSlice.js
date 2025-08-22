import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: {},
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    handleLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    getUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { handleLoading, getUser } = userSlice.actions;
export default userSlice.reducer;
