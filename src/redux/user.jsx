import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userName: ""
};

const userSlice = createSlice({
    name: "regular_user",
    initialState: INITIAL_STATE,
    reducers: {
      updateUserName: (state, action) => {
        state.userName = action.payload;
      },
    }
  });

  export const {
    updateUserName
  } = userSlice.actions;
  
  export default userSlice.reducer;
  