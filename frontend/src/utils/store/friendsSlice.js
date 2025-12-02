import { createSlice } from "@reduxjs/toolkit"

const friendsSlice = createSlice({
    name: "friends",
    initialState: null,
    reducers: {
        addFriends: (state, action) => action.payload,
        removeFriends: () => null
    }
});

export const { addFriends, removeFriends } = friendsSlice.actions;

export default friendsSlice.reducer;