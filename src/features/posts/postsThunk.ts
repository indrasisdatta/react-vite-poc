import { getPosts } from "./postsApi"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts", 
    async (page: string | number | undefined, { rejectWithValue }) => {
        try {
            const res = await getPosts(page);
            return res.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || e.message)
        }
    }
);