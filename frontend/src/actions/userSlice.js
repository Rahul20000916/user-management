import { createSlice } from "@reduxjs/toolkit";

const getUserIdFromLocalStorage = () => {
  const userId = localStorage.getItem("userId");
  return userId || "";
};

const initialState = {
  userId: getUserIdFromLocalStorage()
};

export const userSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload); 
    }
  }
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
