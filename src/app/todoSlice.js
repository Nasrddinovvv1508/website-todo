import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    todos: [],
    copmlated: 0,
    unCopmlated: 0,
};

let todoSlice = createSlice({
    name: `todo`,
    initialState,
    reducers: {
        addTodo: () => {},
        removeTodo: () => {},
        changeTodoStatus: () => {},
        calculateTotal: () => {},
    },
})

export let {addTodo, removeTodo, calculateTotal, changeTodoStatus} = todoSlice.actions;
export default todoSlice.reducer