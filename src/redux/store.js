// import Modules
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create initial States
const inititalSideMenu = { showSideMenu: false };
const initialRoomsAfterFilteredByOptions = { rooms: [] };
const initialUserOptions = {
  city: "",
  startDate: "",
  endDate: "",
  adults: 0,
  children: 0,
};
const initialModalCart = { cart: null, showModal: false, refresh: false };
const initialModalImageRoom = { imageActive: "", showModal: false };
const initialUser = {
  user: {
    userId: "",
    username: "",
  },
  detail: null,
  isLoggedIn: false,
};
const initialCheckout = { cart: {} };

// Create Slides
const sideMenuSlice = createSlice({
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

const roomSlice = createSlice({
  name: "rooms",
  initialState: initialRoomsAfterFilteredByOptions,
  reducers: {
    updatedRooms(state, action) {
      state.rooms = action.payload;
    },
    resetRooms(state, action) {
      state.rooms = [];
    },
  },
});

const optionsSlice = createSlice({
  name: "options",
  initialState: initialUserOptions,
  reducers: {
    saveValueOptions(state, action) {
      const { date, options, city } = action.payload;

      return {
        ...state,
        adults: options.adults,
        children: options.children,
        city: city,
        startDate: date.startDate,
        endDate: date.endDate,
      };
    },
  },
});

const modalCartSlice = createSlice({
  name: "modal-cart",
  initialState: initialModalCart,
  reducers: {
    showModalCart(state, data) {
      const cart = data.payload;
      return {
        ...state,
        cart: cart,
        showModal: true,
      };
    },
    hideModalCart(state, data) {
      return {
        ...state,
        rooms: null,
        showModal: false,
      };
    },
    saveModalCart(state, data) {
      state.refresh = !state.refresh;
    },
  },
});

const modalImageRoomSlice = createSlice({
  name: "modal-imageRoom",
  initialState: initialModalImageRoom,
  reducers: {
    showModalImageRoom(state, data) {
      const images = data.payload;
      return {
        ...state,
        images: images,
        showModal: true,
      };
    },
    hideModalImageRoom(state, data) {
      return {
        ...state,
        images: [],
        showModal: false,
      };
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login(state, data) {
      const { user, isLoggedIn } = data.payload;
      return {
        ...state,
        isLoggedIn: isLoggedIn,
        user: { userId: user.userId, username: user.username },
        detail: user.detail,
      };
    },
    logout(state, data) {
      return { ...state, isLoggedIn: false, user: null, detail: null };
    },
  },
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initialCheckout,
  reducers: {
    saveCarts(state, data) {
      state.cart = data.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    sideMenu: sideMenuSlice.reducer,
    updatedRoom: roomSlice.reducer,
    options: optionsSlice.reducer,
    modalCart: modalCartSlice.reducer,
    user: userSlice.reducer,
    modalImageRoom: modalImageRoomSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
});

// Create Actions from Slice

const sideMenuAction = sideMenuSlice.actions;
const roomAction = roomSlice.actions;
const optionsAction = optionsSlice.actions;
const modalCartAction = modalCartSlice.actions;
const modalImageRoomAction = modalImageRoomSlice.actions;
const userAction = userSlice.actions;
const checkoutAction = checkoutSlice.actions;

export default store;
export {
  sideMenuAction,
  roomAction,
  optionsAction,
  modalCartAction,
  userAction,
  modalImageRoomAction,
  checkoutAction,
};
