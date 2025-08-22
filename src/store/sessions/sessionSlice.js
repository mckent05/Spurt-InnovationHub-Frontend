import { getToken } from "../utils/sessions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSignedUp: false,
  isSignedIn: !!getToken(),
  isSignedOut: true,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    handleLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    userSignUp: (state, action) => ({
      ...state,
      isSignedUp: action.payload,
    }),
    userSignIn: (state) => ({
      ...state,
      isSignedIn: !!getToken(),
      isSignedOut: false,
    }),
    userSignOut: (state) => ({
      ...state,
      isSignedIn: false,
      isSignedOut: true,
    }),
  },
});

export const { handleLoading, userSignIn, userSignUp, userSignOut } =
  sessionSlice.actions;

export default sessionSlice.reducer;
