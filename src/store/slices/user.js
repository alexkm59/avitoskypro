import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: "",
  userPassword: "",
  userName: "",
  userSurname: "",
  userСity:"",
  userSellsFrom:"",
  userPhone:"",
  loading: false,
  error: null,
  accessToken:"",
  refreshToken:"",
  
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userRegistrationStart: (state, action) => {
      state.loading = true;
    },

    userRegistrationSuccess: (state, action) => {
      const user = action.payload;
      state.userId = user.id;
      state.userEmail = user.email;
      // state.userPassword = userData;
      state.userName = user.name;
      state.userSurname = user.surname;
      state.userСity = user.city;
      state.loading = false;
    },

    userRegistrationFailure: (state, action) => {
      const error = action.payload;
      state.loading = false;
      state.error = error;
      console.log(error);
    },
    

// логирование пользователя шаг1. получение токена
    userLoginStart: (state, action) => {
      state.loading = true;
    },

    userLoginSuccess: (state, action) => {
      const user = action.payload;
      state.accessToken = user.access_token;
      state.refreshToken = user.refresh_token;
      state.loading = false;
    },

    userLoginFailure: (state, action) => {
      const error = action.payload;
      state.loading = false;
      state.error = error;
      // state.error = error.detail[0].msg;
    },

  // логирование пользователя шаг2. получение пользователя по токену
  userInputStart: (state, action) => {
    state.loading = true;
  },

  userInputSuccess: (state, action) => {
    const user = action.payload;
    console.log(user.id);
    state.userId = user.id;
    state.userEmail = user.email;
    state.userName = user.name;
    state.userSurname = user.surname;
    state.userСity = user.city;
    state.userSellsFrom = user.sells_from;
    state.userPhone = user.phone;
    state.loading = false;
  },

  userInputFailure: (state, action) => {
    const error = action.payload;
    state.loading = false;
    state.error = error;
    // state.error = error.detail[0].msg;
  },

  
  },
});

export const {
    userRegistrationStart,
    userRegistrationSuccess,
    userRegistrationFailure,
    userLoginStart,
    userLoginSuccess,
    userLoginFailure,
    userInputStart,
    userInputSuccess,
    userInputFailure,
} = userSlice.actions;
export default userSlice.reducer;