import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hubBookings: [],
  updatedHubBooking: {},
};

const hubBookingSlice = createSlice({
  name: "hubBookings",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getHubBookings: (state, action) => {
      state.hubBookings = action.payload;
    },
    createHubBooking: (state, action) => {
      state.hubBookings.push(action.payload);
    },
    updateHubBooking: (state, action) => {
      const updatedHubBooking = action.payload;
      state.hubBookings = state.hubBookings.map((booking) =>
        booking._id === updatedHubBooking._id ? { ...updatedHubBooking } : booking
      );
      state.updatedHubBooking = updatedHubBooking;
    },
  },
});

export const { handleLoading, getHubBookings, createHubBooking, updateHubBooking } =
  hubBookingSlice.actions;
export default hubBookingSlice.reducer;
