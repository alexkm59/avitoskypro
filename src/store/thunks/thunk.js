import { getAlladvertis, getImages } from "../../api";
import {
  allAdsLoadingStart,
  allAdsLoadingSuccess,
  allAdsLoadingFailure,
} from "../slices/ads";
import {
  allImagesLoadingStart,
  allImagesLoadingSuccess,
  allImagesLoadingFailure,
} from "../slices/images";

export const fetchAds = () => async (dispatch, getState) => {
  dispatch(allAdsLoadingStart());

  try {
    const data = await getAlladvertis();
    dispatch(allAdsLoadingSuccess(data));
  } catch (error) {
    dispatch(allAdsLoadingFailure(error));
  }
};



export const fetchAllImages = () => async (dispatch, getState) => {
  dispatch(allImagesLoadingStart());

  try {
    const data = await getImages();
    dispatch(allImagesLoadingSuccess(data));
  } catch (error) {
    dispatch(allImagesLoadingFailure(error));
  }
};







