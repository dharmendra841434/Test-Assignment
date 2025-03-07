import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isOpenDrawer: false,
    test: "This is test",
  },
  reducers: {
    setIsOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
  },
});

export const { setIsOpenDrawer } = appSlice.actions;

export default appSlice.reducer;
