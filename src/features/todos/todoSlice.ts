import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Counts, Todo } from "./todoTypes";
import API from "../../services/api";

interface TodosState {
    todos: Todo[];
    counts: Counts;
    loading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    todos: [],
    counts: {
        all: 0,
        categories: {
            work: 0,
            learning: 0,
            personal: 0
        },
        priorities: {
            high: 0,
            medium: 0,
            low: 0
        }
    },
    loading: false,
    error: null
}

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, {rejectWithValue}) => {
        const resp = await API.get('/todos');
        if(resp.status === 200) {
            const data = resp.data.data;
            const counts = resp.data.counts;
            return {data, counts};
        } else {
            return rejectWithValue('Failed to fetch todos');
        }
    }
);

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async(data: {task: string, completed: boolean, category: 'Work' | 'Learning' | 'Personal', priority: 'Low' | 'Medium' | 'High'}, {rejectWithValue}) => {
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
    async({ _id, completed }: { _id: string; completed: boolean },
        { rejectWithValue }) => {
        try {
            const resp = await API.put(`/todos/${_id}`, { completed: !completed });
            return { _id, completed: !completed, response: resp.data };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to toggle todo';
            return rejectWithValue({ _id, error: errorMessage });
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todos/updateTodo',
    async({ _id, ...data }: Partial<Todo> & { _id: string }, { rejectWithValue }) => {
        try {
            const resp = await API.put(`/todos/${_id}`, data);
            return resp.data.data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update todo';
            return rejectWithValue(errorMessage);
        }
    }
);

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
                state.todos = action.payload.data;
                state.counts = action.payload.counts;
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
                const { _id } = action.meta.arg;
                const index = state.todos.findIndex(todo => todo._id === _id);
                if (index !== -1) {
                    state.todos[index].completed = !state.todos[index].completed;
                }
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                // The optimistic update is already done in pending
                // Here we can handle any server response if needed
                const { _id, response } = action.payload;
                const index = state.todos.findIndex(todo => todo._id === _id);
                if (index !== -1 && response?.data) {
                    // Update with server response if it contains additional data
                    state.todos[index] = { ...state.todos[index], ...response.data };
                }
            })
            .addCase(toggleTodo.rejected, (state, action) => {
                // Revert the optimistic update on error
                const { _id } = action.meta.arg;
                const index = state.todos.findIndex(todo => todo._id === _id);
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
            .addCase(updateTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo._id === action.payload._id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
    }
        
})

export default todosSlice.reducer;
