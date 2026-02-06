import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsThunk";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            })
    }
})

export default postsSlice.reducer;