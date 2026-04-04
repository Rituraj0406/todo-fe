import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todoSlice";
import authReducer from "../features/auth/authSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";


export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        auth: authReducer,
        todos: todosReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;