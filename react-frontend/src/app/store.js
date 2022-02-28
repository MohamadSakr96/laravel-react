import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)