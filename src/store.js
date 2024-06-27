import { configureStore } from "@reduxjs/toolkit";
import userReducer from './app/userSlice'
import todoReducer from './app/todoSlice';

export let store = configureStore({
    reducer : {
        user: userReducer,
        todos: todoReducer,
    },
})