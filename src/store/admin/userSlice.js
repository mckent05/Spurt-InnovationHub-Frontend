import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  pendingUsers: [],
  updatedUser: {},
};

const adminUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getUsers: (state, action) => {
      state.pendingUsers = action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.pendingUsers = state.pendingUsers.filter(
        (user) => user._id !== updatedUser._id
      );
      state.updatedUser = updatedUser;
    },
  },
});

export const { handleLoading, getUsers, updateUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;
