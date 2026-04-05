import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "./authTypes";
import API from "../../services/api";

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const savedUser = localStorage.getItem('user');
const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    loading: false,
    error: null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeUser = (userData: any, token?: string): User | null => {
    if (!userData) return null;

    const _id = userData._id ?? userData.id;
    const email = userData.email;
    const name = userData.name ?? "";

    if (!_id || !email) return null;

    return {
        _id,
        name,
        email,
        token: token ?? userData.token ?? "",
        providers: userData.providers,
        avatar: userData.avatar,
    };
};

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (data: { name: string; email: string; password: string }) => {
        const response = await API.post('/auth/register', data);
        const responseData = response.data;
        const payload = responseData.user ? responseData.user : responseData;
        const token = payload.token ?? responseData.token;

        if (token) {
            localStorage.setItem('token', token);
        }

        return normalizeUser(payload, token);
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data: { email: string; password: string }) => {
        const response = await API.post('/auth/login', data);
        const responseData = response.data;
        const payload = responseData.user ? responseData.user : responseData;
        const token = payload.token ?? responseData.token;

        if (token) {
            localStorage.setItem('token', token);
        }

        return normalizeUser(payload, token);
    }
);

// Async thunk for user login using google api
export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (access_token: string, { rejectWithValue }) => {
        try {
            const response = await API.post('/auth/google', {
                access_token,
            });
            const responseData = response.data;
            const payload = responseData.user ? responseData.user : responseData;
            const token = payload.token ?? responseData.token;

            if (token) {
                localStorage.setItem('token', token);
            }

            const user = normalizeUser(payload, token);
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Google login failed")
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.token) {
                    state.user = action.payload;
                    localStorage.setItem('user', JSON.stringify(action.payload));
                } else {
                    state.user = null;
                }
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Signup failed';
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || 'Google login failed';
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;