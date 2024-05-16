import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}){
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if(!response.ok) {
                throw new Error('Server Error')
            }

            const data = await response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const initialState = {
    todos: [],
    status: null,
    error: null,
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
    extraReducers: builder => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            });
    }
});

export const { addTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;