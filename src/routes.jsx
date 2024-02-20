import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/main";
import { LoginPage } from "./pages/signin";
import { SignUpPage } from "./pages/signup";
import { ProfilePage } from "./pages/profile";
import { AdvPage } from "./pages/adv_page";
import { SellerProfilePage } from "./pages/seller_profile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/adv_page" element={<AdvPage />} />
      <Route path="/seller_profile" element={<SellerProfilePage />} />
    </Routes>
  );
};
