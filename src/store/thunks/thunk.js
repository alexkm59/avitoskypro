import {
  getAlladvertis,
  getImages,
  userDataChangeApi,
  userInputApi,
  userLoginApi,
  userRegistration,
} from "../../api";
import {
  allAdsLoadingStart,
  allAdsLoadingSuccess,
  allAdsLoadingFailure,
  activeAdsIdLoading,
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
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  userInputStart,
  userInputSuccess,
  userInputFailure,
  userDataChangeStart,
    userDataChangeSuccess,
    userDataChangeFailure,
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

export const fetchUserRegistration =
  ({ email, password, name, surname, city }) =>
  async (dispatch, getState) => {
    dispatch(userRegistrationStart({ email, password, name, surname, city }));

    try {
      const data = await userRegistration({
        email,
        password,
        name,
        surname,
        city,
      });
      dispatch(userRegistrationSuccess(data));
    } catch (error) {
      dispatch(userRegistrationFailure(error));
    }
  };

export const fetchUserLogin =
  ({ login, password }) =>
  async (dispatch, getState) => {
    dispatch(userLoginStart());

    try {
      const Response = await userLoginApi({ login, password });

      const data = await Response.json();
      console.log(data);
      console.log(Response);

      if (!Response.ok) {
        dispatch(
          userLoginFailure("Логин или пароль не верны. Скорректируйте данные.")
        );
      } else {
        dispatch(userLoginSuccess(data));
      }
    } catch (error) {
      dispatch(userLoginFailure(error));
    }
  };


export const fetchUserInput = ({token}) => async (dispatch, getState) => {
    dispatch(userInputStart());

    try {
      const Response = await userInputApi({token});

      const data = await Response.json();
      console.log(data);
      console.log(Response);

      if (!Response.ok) {
        dispatch(userInputFailure("Ошибка идентификации пользователя."));
      } else {
        dispatch(userInputSuccess(data));
      }
    } catch (error) {
      dispatch(userInputFailure(error));
    }
  };


  export const fetchUserDataChange = ({token, email, name, surname}) => async (dispatch, getState) => {
    dispatch(userDataChangeStart());

    try {
      const Response = await userDataChangeApi({token, email, name, surname});

      const data = await Response.json();
      console.log(data);
      console.log(Response);

      if (!Response.ok) {
        dispatch(userDataChangeFailure("Ошибка идентификации пользователя."));
      } else {
        dispatch(userDataChangeSuccess(data));
      }
    } catch (error) {
      dispatch(userDataChangeFailure(error));
    }
  };

