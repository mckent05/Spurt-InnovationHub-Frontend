import { handleLoading, updateUser, getUsers } from "./userSlice";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchAllUsers = createAsyncThunk(
  "get/experts",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/admin/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      dispatch(getUsers(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const updateUserAPI = createAsyncThunk(
  "user/update",
  async (userAction, { dispatch, rejectWithValue }) => {
    const token = getToken();

    const { id, action } = userAction;

    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/admin/users/${id}/${action}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(updateUser(data));
      toast.success("User status updated!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);
