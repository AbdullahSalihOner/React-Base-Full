import { createSlice } from "@reduxjs/toolkit";


const courseSlice = createSlice({
    name: "form",
    initialState: {
        searchTerm: '',
        data : [],
    },
    reducers: {},
});

export const courseReducer = courseSlice.reducer;