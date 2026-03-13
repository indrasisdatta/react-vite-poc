import { getPosts } from "./postsApi"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts", 
    async (page: string | number | undefined, { rejectWithValue }) => {
        try {
            const res = await getPosts(page);
            return res.data;
        } catch (e) {
            const error = e as AxiosError;
            return rejectWithValue(error.response?.data || error.message)
        }
    }
);