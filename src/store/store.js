import { configureStore } from "@reduxjs/toolkit";
import adsSlice from "./slices/ads";
import { thunk } from "redux-thunk";
import imagesSlice from "./slices/images";
import activeAdsSlice from "./slices/adsItem";


export const store = configureStore({
  reducer: {
    ads: adsSlice,
    images: imagesSlice,
    activeAdsId: activeAdsSlice,
  },
  // middleware: [thunk],
});
