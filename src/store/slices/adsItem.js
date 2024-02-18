import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeAdsId: null,
};

export const activeAdsSlice = createSlice({
  name: "activeAds",
  initialState,
  reducers: {
    activeAdsIdLoading: (state, action) => {
      state.activeAdsId = action.payload;
    },
  },
});

export const { activeAdsIdLoading } = activeAdsSlice.actions;
export default activeAdsSlice.reducer;
