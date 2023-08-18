import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userData: []
};

const adminSlice = createSlice({
    name: "admin",
    initialState: INITIAL_STATE,
    reducers: {
      updateUserData: (state, action) => {
        state.userData = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      },
    }
  });

  export const {
    updateUserData
  } = adminSlice.actions;
  
  export default adminSlice.reducer;
  