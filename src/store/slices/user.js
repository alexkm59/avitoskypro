import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userEmail: "",
  userPassword: "",
  userName: "",
  userSurname: "",
  userСity:"",
  loading: false,
  error: null,
  
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
    
    // activeAdsIdLoading: (state, action) => {
    //   state.activeAdsId = action.payload;
    // },
  
  
  },
});

export const {
    userRegistrationStart,
    userRegistrationSuccess,
    userRegistrationFailure,
} = userSlice.actions;
export default userSlice.reducer;