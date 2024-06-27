import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null,
    isAuthReady: false,
};


let userSlice = createSlice({
    name: `user`,
    initialState,
    reducers: {
        login: () => { },
        logout: () => { },
        isAuthChange: () => { },
    },
})

export let { login, logout, isAuthChange } = userSlice.actions
export default userSlice.reducer