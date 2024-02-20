import { getAlladvertis, getImages, userRegistration } from "../../api";
import {
  allAdsLoadingStart,
  allAdsLoadingSuccess,
  allAdsLoadingFailure,
  activeAdsIdLoading
} from "../slices/ads";

import {
  allImagesLoadingStart,
  allImagesLoadingSuccess,
  allImagesLoadingFailure,
} from "../slices/images";

import {
  userRegistrationStart,
    userRegistrationSuccess,
    userRegistrationFailure,
} from "../slices/user";

// import {activeAdsIdLoading} from "../slices/adsItem"

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

export const getActiveAdsId = (id) => async (dispatch, getState) => {
 
    dispatch(activeAdsIdLoading(id));
  
};

export const fetchUserRegistration = () => async (dispatch, getState) => {
  dispatch(userRegistrationStart());

  try {
    const data = await userRegistration();
    dispatch(userRegistrationSuccess(data));
  } catch (error) {
    dispatch(userRegistrationFailure(error));
  }
};



