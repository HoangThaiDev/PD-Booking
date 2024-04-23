// import Modules
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create initial States
const inititalSideMenu = { showSideMenu: false };

// Create Slides

const SideMenuSlice = createSlice({
  name: "sideMenu",
  initialState: inititalSideMenu,
  reducers: {
    showSideMenu(state, action) {
      state.showSideMenu = true;
    },
    hideSideMenu(state, action) {
      state.showSideMenu = false;
    },
  },
});

const store = configureStore({
  reducer: {
    sideMenu: SideMenuSlice.reducer,
  },
});

// Create Actions from Slice

const sideMenuAction = SideMenuSlice.actions;

export default store;
export { sideMenuAction };
