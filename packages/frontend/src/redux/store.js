import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import transactionReducer from './transactionSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer,
        transaction: transactionReducer
    }
});
