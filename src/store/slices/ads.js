import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  allAds: [],
  activeAdsId: null,
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
    
    activeAdsIdLoading: (state, action) => {
      state.activeAdsId = action.payload;
    },

    addAdsTextOnlyStart: (state, action) => {
      state.loading = true;
    },

    addAdsTextOnlySuccess: (state, action) => {
      const newAds = action.payload;
      state.loading = false;
      state.error = null;
      console.log(newAds);
    },

    addAdsTextOnlyFailure: (state, action) => {
      const error = action.payload;
      state.loading = false;
      state.error = error;
    },


    addAdsStart: (state, action) => {
      state.loading = true;
    },

    addAdsSuccess: (state, action) => {
      const newAds = action.payload;
      state.loading = false;
      state.error = null;
      console.log(newAds);
    },

    addAdsFailure: (state, action) => {
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
  activeAdsIdLoading,
  addAdsTextOnlyStart,
  addAdsTextOnlySuccess,
  addAdsTextOnlyFailure,
  addAdsStart,
  addAdsSuccess,
  addAdsFailure,
} = adsSlice.actions;
export default adsSlice.reducer;
