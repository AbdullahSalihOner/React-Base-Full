import { configureStore } from '@reduxjs/toolkit';
import { courseReducer } from './slices/courseSlice';
import { formReducer } from './slices/formSlice';

export const store = configureStore({
    reducer: {
        course : courseReducer,
        form : formReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
