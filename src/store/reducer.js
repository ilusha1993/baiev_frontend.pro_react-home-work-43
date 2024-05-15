import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos[action.payload.index];
            todo.completed = !todo.completed;
        },
    },
});

export const { addTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;