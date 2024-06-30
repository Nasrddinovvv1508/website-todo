import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null,
    isAuthReady: false,
};


let userSlice = createSlice({
    name: `user`,
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload
        },
        logout: (state, { payload }) => {
            state.user = null
        },
        isAuthChange: (state) => {
            state.isAuthReady = true;
        },
    },
})

export let { login, logout, isAuthChange } = userSlice.actions
export default userSlice.reducer