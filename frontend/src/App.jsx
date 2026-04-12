import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/ UserLogin";
import PartnerRegister from "./pages/PartnerRegister";
import PartnerLogin from "./pages/PartnerLogin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<PartnerRegister />} />
        <Route path="/food-partner/login" element={<PartnerLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;