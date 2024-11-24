import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fakePosts } from "../utils/fakePosts";

export const loadPosts = createAsyncThunk(
    'posts/getPosts',
        async () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(fakePosts)
                }, 2000)
            })
        }
  );
  

const sliceOptions = {
    name: 'posts',
    initialState: {
        posts: [{title: 1, score: 1}, {title: 2, score: 1}, {title: 3, score: 1}, {title: 4, score: 1}],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state, action) => {
                state.isLoading = true
                state.hasError = false
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasError = false
                state.posts = action.payload
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.isLoading = false
                state.hasError = true
            })
    }
}

export const postsSlice = createSlice(sliceOptions);
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;