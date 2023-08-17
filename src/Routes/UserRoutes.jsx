import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages//User/Login";
import Signup from "../pages/User/Signup";
import PrivateComponent from "../components/Authorization/PrivateComponent";
import NavBar from "../components/User/NavBar/NavBar";
import Home from "../pages/User/Home";

const UserRoutes = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 w-full">
        <NavBar />
      </div>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
