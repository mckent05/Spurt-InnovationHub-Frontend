import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  experts: [],
  expert: {},
};

const expertSlice = createSlice({
  name: "experts",
  initialState,
  reducers: {
    handleLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getExperts: (state, action) => {
      state.experts = action.payload;
    },
    createExpert: (state, action) => {
      state.projects.push(action.payload);
    },
    updateExpert: (state, action) => {
      const updatedExpert = action.payload;
      state.experts = state.experts.map((expert) =>
        expert._id === updatedExpert._id ? { ...updatedExpert } : expert
      );
      state.expert = updatedExpert;
    },
  },
});

export const { handleLoading, createExpert, getExperts, updateExpert } =
  expertSlice.actions;
export default expertSlice.reducer;
