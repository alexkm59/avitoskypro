import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingImage: false,
  errorImage: null,
  allImages: [],
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    allImagesLoadingStart: (state, action) => {
      state.loadingImage = true;
    },

    allImagesLoadingSuccess: (state, action) => {
      const allImages = action.payload;
      state.loadingImage = false;
      state.errorImage = null;
      state.allImages = allImages;
      console.log(allImages);
    },

    allImagesLoadingFailure: (state, action) => {
      const error = action.payload;
      state.loadingImages = false;
      state.errorImages = error;
    },
  },
});

export const {
  allImagesLoadingStart,
  allImagesLoadingSuccess,
  allImagesLoadingFailure,
} = imagesSlice.actions;
export default imagesSlice.reducer;
