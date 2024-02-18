import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  allAds: [],
};

export const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    allAdsLoadingStart: (state, action) => {
      state.loading = true;
    },

    allAdsLoadingSuccess: (state, action) => {
      const allAds = action.payload;
      state.loading = false;
      state.error = null;
      state.allAds = allAds;
      console.log(allAds);
    },

    allAdsLoadingFailure: (state, action) => {
      const error = action.payload;
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  allAdsLoadingStart,
  allAdsLoadingSuccess,
  allAdsLoadingFailure,
  allImagesLoadingStart,
  allImagesLoadingSuccess,
  allImagesLoadingFailure,
} = adsSlice.actions;
export default adsSlice.reducer;
