import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminHome from "../pages/Admin/AdminHome";
import AdminPrivateComponent from "../components/Authorization/AdminPrivateComponent";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminNavBar from "../components/Admin/adminNavBar/AdminNavBar";

const AdminRoutes = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 w-full">
        <AdminNavBar />
      </div>
      <Routes>
        <Route element={<AdminPrivateComponent />}>
          <Route path="dashboard" element={<AdminHome />}></Route>
          <Route path="users" element={<AdminUsers />}></Route>
        </Route>
        <Route path="login" element={<AdminLogin />}></Route>
      </Routes>
    </div>
  );
};

export default AdminRoutes;
