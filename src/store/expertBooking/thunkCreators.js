import {
  handleLoading,
  updateExpertBooking,
  getExpertBookings,
  createExpertBooking,
} from "./expertBookingSlice";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchExpertBookings = createAsyncThunk(
  "get/expertsBookings",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/expert-booking`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      dispatch(getExpertBookings(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const createExpertBookingAPI = createAsyncThunk(
  "new/expertBooking",
  async (newExpertBooking, { dispatch, rejectWithValue }) => {
    const token = getToken();

    try {
      const response = await fetch(`${baseURL}/expert-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newExpertBooking),
      });

      const data = await response.json();

      if (data.errors) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(createExpertBooking(data));
      toast.success("New Expert Booking Created!");
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExpertBookingAPI = createAsyncThunk(
  "update/expert",
  async (expertBookingDetails, { dispatch, rejectWithValue }) => {
    const token = getToken();

    const { id, action } = expertBookingDetails;

    dispatch(handleLoading(true));

    try {
      const response = await fetch(
        `${baseURL}/expert-booking/${id}/${action}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(updateExpertBooking(data));
      toast.success("Expert Booking Updated!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);
