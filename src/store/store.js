import { configureStore } from "@reduxjs/toolkit";
import adsSlice from "./slices/ads";
import { thunk } from "redux-thunk";
import imagesSlice from "./slices/images";
import userSlice from "./slices/user";

export const store = configureStore({
  reducer: {
    ads: adsSlice,
    images: imagesSlice,
    user: userSlice,
  },
});
