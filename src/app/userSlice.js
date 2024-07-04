import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null,
    isAuthReady: false,
};

let userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload;
        },
        logout: (state) => {
            state.user = null;
        },
        isAuthChange: (state) => {
            state.isAuthReady = true;
        },
        UpdateProfile: (state, { payload }) => {
            state.user = { ...state.user, ...payload }; // user obyektini yangilash
        },
    },
});

export let { login, logout, isAuthChange, UpdateProfile } = userSlice.actions;
export default userSlice.reducer;
