import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  expertBookings: [],
  updatedBooking: {},
};

const expertBookingSlice = createSlice({
  name: "expertBookings",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getExpertBookings: (state, action) => {
      state.expertBookings = action.payload;
    },
    createExpertBooking: (state, action) => {
      state.expertBookings.push(action.payload);
    },
    updateExpertBooking: (state, action) => {
      const updatedBooking = action.payload;
      state.expertBookings = state.expertBookings.map((booking) =>
        booking._id === updatedBooking._id ? { ...updatedBooking } : booking
      );
      state.updatedBooking = updatedBooking;
    },
  },
});

export const { handleLoading, getExpertBookings, createExpertBooking, updateExpertBooking } =
  expertBookingSlice.actions;
export default expertBookingSlice.reducer;
