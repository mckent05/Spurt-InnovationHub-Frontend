import {
  handleLoading,
  getExperts,
  updateExpert,
  createExpert,
} from "./expertSlice";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchExperts = createAsyncThunk(
  "get/experts",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/experts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      dispatch(getExperts(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const createExpertAPI = createAsyncThunk(
  "new/expert",
  async (newExpert, { dispatch, rejectWithValue }) => {
    const token = getToken();

    try {
      const response = await fetch(`${baseURL}/experts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExpert),
      });

      const data = await response.json();

      if (data.errors) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(createExpert(data));
      toast.success("New Expert Created!");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpertAPI = createAsyncThunk(
  "update/expert",
  async (expertDetail, { dispatch, rejectWithValue }) => {
    const token = getToken();

    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/experts/update-expert`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expertDetail),
      });

      const data = await response.json();

      if (data.error) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(updateExpert(data));
      toast.success("Expert Updated!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);
