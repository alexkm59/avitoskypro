import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: "",
  userPassword: "",
  userName: "",
  userSurname: "",
  userCity: "",
  userSellsFrom: "",
  userPhone: "",
  userAvatar: "",
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
    state.userCity = user.city;
    state.userSellsFrom = user.sells_from;
    state.userPhone = user.phone;
    state.userAvatar = user.avatar;
    state.loading = false;
  },

  userInputFailure: (state, action) => {
    const error = action.payload;
    state.loading = false;
    state.error = error;
    
  },

// изменение данных пользователя
userDataChangeStart: (state, action) => {
  state.loading = true;
},

userDataChangeSuccess: (state, action) => {
  const user = action.payload;
  state.userEmail = user.email;
  state.userName = user.name;
  state.userSurname = user.surname;
  state.loading = false;
},

userDataChangeFailure: (state, action) => {
  const error = action.payload;
  state.loading = false;
  state.error = error;
  
},

// Обновление токенов
userTokenRefresh: (state, action) => {
  
  const user = action.payload;
  console.log(user.access_token);
  state.accessToken = user.access_token;
  state.refreshToken = user.refresh_token;
  state.loading = false;
},

// выход пользователя

userExit: (state, action) => {
  const user = action.payload;
  state.userId = null;
  state.userEmail = "";  
  state.userName = "";
  state.userSurname = "";
  state.userCity = "";
  state.userSellsFrom = "";
  state.userPhone = "";
  state.userAvatar = "";
  state.loading = false;
  state.accessToken = "";
  state.refreshToken = "";

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
    userDataChangeStart,
    userDataChangeSuccess,
    userDataChangeFailure,
    userTokenRefresh,
    userExit,

} = userSlice.actions;
export default userSlice.reducer;