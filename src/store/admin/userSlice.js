import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allUsers: [],
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
      state.allUsers = action.payload;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.allUsers = state.allUsers.map((user) =>
        user._id === updatedUser._id ? { ...updatedUser } : user
      );
      state.updatedUser = updatedUser;
    },
  },
});

export const { handleLoading, getUsers, updateUser } =
  adminUserSlice.actions;
export default adminUserSlice.reducer;
