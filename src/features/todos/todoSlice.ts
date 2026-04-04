import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Todo } from "./todoTypes";
import API from "../../services/api";

interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null
}

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, {rejectWithValue}) => {
        const resp = await API.get('/todos');
        if(resp.status === 200) {
            const data = resp.data.data;
            return data;
        } else {
            return rejectWithValue('Failed to fetch todos');
        }
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async(data: {task: string, completed: boolean}, {rejectWithValue}) => {
        try {
            const resp = await API.post('/todos', data);
            return resp.data.todo;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to add todo';
            return rejectWithValue(errorMessage);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async(id: string, {rejectWithValue}) => {
        try{
            const resp = await API.delete(`/todos/${id}`);
            return resp.data.id;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete todo';
            return rejectWithValue(errorMessage);
        }
    }
);

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async({ id, completed }: { id: string; completed: boolean },
        { rejectWithValue }) => {
        try {
            const resp = await API.put(`/todos/${id}`, { completed: !completed });
            return { id, completed: !completed, response: resp.data };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to toggle todo';
            return rejectWithValue({ id, error: errorMessage });
        }
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.unshift(action.payload);
                state.loading = false;
                state.error = null;
            })
            .addCase(toggleTodo.pending, (state, action) => {
                const { id } = action.meta.arg;
                const index = state.todos.findIndex(todo => todo._id === id);
                if (index !== -1) {
                    state.todos[index].completed = !state.todos[index].completed;
                }
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                // The optimistic update is already done in pending
                // Here we can handle any server response if needed
                const { id, response } = action.payload;
                const index = state.todos.findIndex(todo => todo._id === id);
                if (index !== -1 && response) {
                    // Update with server response if it contains additional data
                    state.todos[index] = { ...state.todos[index], ...response };
                }
            })
            .addCase(toggleTodo.rejected, (state, action) => {
                // Revert the optimistic update on error
                const { id } = action.meta.arg;
                const index = state.todos.findIndex(todo => todo._id === id);
                if (index !== -1) {
                    state.todos[index].completed = !state.todos[index].completed;
                }
                state.error = (action.payload as { error?: string })?.error || 'Failed to toggle todo';
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo._id !== action.payload);
                state.loading = false;
                state.error = null;
            })
    }
        
})

export default todosSlice.reducer;
