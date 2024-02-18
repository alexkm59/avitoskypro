import { configureStore } from "@reduxjs/toolkit";
import  adsSlice  from "./slices/ads";
import { thunk } from "redux-thunk";
import  imagesSlice  from "./slices/images";

export const store = configureStore({
  reducer: {
    ads: adsSlice,
    images: imagesSlice,
  },
  // middleware: [thunk],
});
