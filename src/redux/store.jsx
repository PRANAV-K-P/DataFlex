import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin";


const storedUserData = localStorage.getItem("userData");

export const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
  preloadedState: {
    admin: {
      userData: storedUserData ? JSON.parse(storedUserData) : [],
    },
  },
});
