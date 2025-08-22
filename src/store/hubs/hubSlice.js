import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  hubs: [],
  hubInfo: {},
  hubAvail: [],
};

const hubSlice = createSlice({
  name: "hubs",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getHubs: (state, action) => {
      state.hubs = action.payload;
    },
    getHub: (state, action) => {
      state.hubInfo.hub = action.payload.hub;
      state.hubInfo.availability = action.payload.availability;
    },
    createHub: (state, action) => {
      state.hubs.push(action.payload);
    },
    createAvailability: (state, action) => {
      state.hubAvail.push(action.payload);
    },
  },
});

export const { handleLoading, getHubs, getHub, createHub, createAvailability } =
  hubSlice.actions;
export default hubSlice.reducer;
