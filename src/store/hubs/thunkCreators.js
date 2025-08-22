import {
  handleLoading,
  getHubs,
  getHub,
  createHub,
  createAvailability,
} from "./hubSlice";
import { getToken, baseURL } from "../utils/sessions";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchHubs = createAsyncThunk(
  "get/Hubs",
  async (_, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/hubs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      dispatch(getHubs(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const fetchHub = createAsyncThunk(
  "get/Hub/id",
  async (id, { dispatch, rejectWithValue }) => {
    const token = getToken();
    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/hubs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.error);
      }

      dispatch(getHub(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);

export const createHubAPI = createAsyncThunk(
  "new/hub",
  async (newHub, { dispatch, rejectWithValue }) => {
    const token = getToken();

    try {
      const response = await fetch(`${baseURL}/hubs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHub),
      });

      const data = await response.json();

      if (data.errors) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(createHub(data));
      toast.success("New Hub Created!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createAvailAPI = createAsyncThunk(
  "new/hub-availability",
  async (availabilityDetails, { dispatch, rejectWithValue }) => {
    const token = getToken();

    const { hubId, ...hubAvail } = availabilityDetails;

    dispatch(handleLoading(true));

    try {
      const response = await fetch(`${baseURL}/hubs/${hubId}/availabilities`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hubAvail),
      });

      const data = await response.json();

      if (data.error) {
        const error = data.error;
        toast.error(error);
        throw new Error(error);
      }

      dispatch(createAvailability(data));
      toast.success("New Hub Avaialability created!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      dispatch(handleLoading(false));
    }
  }
);
