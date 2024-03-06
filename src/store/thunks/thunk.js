import {
  getAlladvertis,
  getImages,
  postNewAds,
  postNewAdsTextOnly,
  refreshTokensApi,
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
  addAdsTextOnlyStart,
  addAdsTextOnlySuccess,
  addAdsTextOnlyFailure,
  addAdsStart,
  addAdsSuccess,
  addAdsFailure,
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
    userTokenRefresh,
    userExit,
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


  export const fetchUserDataChange = ({token, email, name, surname, city}) => async (dispatch, getState) => {
    dispatch(userDataChangeStart());

    try {
      const Response = await userDataChangeApi({token, email, name, surname, city});

      const data = await Response.json();
      console.log(data);
      console.log(Response);

      // if (!Response.ok) {
      //   dispatch(userDataChangeFailure("Ошибка идентификации пользователя."));
      // } else {
        dispatch(userDataChangeSuccess(data));
      // }
    } catch (error) {
      dispatch(userDataChangeFailure(error));
    }
  };

  export const fetchNewAdvTextOnly = ({token, title, description, price}) => async (dispatch, getState) => {
    dispatch(addAdsTextOnlyStart());
  
    try {
      const data = await postNewAdsTextOnly({token, title, description, price});
      dispatch(addAdsTextOnlySuccess(data));
      
    } catch (error) {
      dispatch(addAdsTextOnlyFailure(error));
    }
  };

  export const fetchNewAdv = ({token, title, description, price}) => async (dispatch, getState) => {
    dispatch(addAdsStart());
  
    try {
      const data = await postNewAds({token, title, description, price});
      dispatch(addAdsSuccess(data));
    } catch (error) {
      dispatch(addAdsFailure(error));
    }
  };


  export const userTokensRefresh = ({accessToken, refreshToken}) => async (dispatch, getState) => {
    
      const data = await refreshTokensApi({accessToken, refreshToken});
      dispatch(userTokenRefresh(data));
    
  };

  export const userExitThunk = () => async (dispatch, getState) =>{
    dispatch(userExit());

  };
  