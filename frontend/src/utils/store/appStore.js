import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import friendsSlice from "./friendsSlice.js";

const appStore = configureStore({
    reducer: {
        user: userSlice,
        friends: friendsSlice
    }
});

export default appStore;