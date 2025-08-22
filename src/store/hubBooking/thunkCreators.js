import {
  handleLoading,
  updateHubBooking,
  getHubBookings,
  createHubBooking,
} from "./hubBookingSlice";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchHubBookings = createAsyncThunk(
  "get/expertsBookings",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/hub-booking`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      dispatch(getHubBookings(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const createHubBookingAPI = createAsyncThunk(
  "new/expertBooking",
  async (newHubBooking, { dispatch, rejectWithValue }) => {
    const token = getToken();

    try {
      const response = await fetch(`${baseURL}/hub-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHubBooking),
      });

      const data = await response.json();

      if (data.errors) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(createHubBooking(data));
      toast.success("New Hub Booking Created!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHubBookingAPI = createAsyncThunk(
  "update/hub-booking",
  async (hubBookingDetails, { dispatch, rejectWithValue }) => {
    const token = getToken();

    const { id, action } = hubBookingDetails;

    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/hub-booking/${id}/${action}`, {
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

      dispatch(updateHubBooking(data));
      toast.success("hub Booking Updated!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);
