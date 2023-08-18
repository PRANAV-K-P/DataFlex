import React, { useEffect } from "react";
import { bearer } from "../../../utils/constants";
import axiosInstance from "../../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../../redux/admin";
import PieChart from "./PieChart";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      let response = await axiosInstance.get("/admin/all-users", {
        headers: {
          Authorization: `${bearer} ${JSON.parse(
            localStorage.getItem("adminToken")
          )}`,
        },
      });
      if (response.data) {
        const res = response.data;
        dispatch(updateUserData(res));
      }
    } catch (err) {}
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="px-2 lg:px-28 pt-24 h-[720px]">
      <div className="shadow-2xl flex justify-center">
        <div>
          <h2 className="text-2xl font-medium ml-32">User Gender Profile</h2>
          <div className="w-[500px]">
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
