import { handleLoading, getUser } from "./userSlice";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserProfile = createAsyncThunk(
  "get/user",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/my-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      dispatch(getUser(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);
