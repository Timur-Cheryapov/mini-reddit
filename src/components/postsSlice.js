import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../utils/Reddit";

export const loadPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, { rejectWithValue }) => {
        try {
            const posts = await Reddit.getPosts()
            return posts
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
  

const sliceOptions = {
    name: 'posts',
    initialState: {
        posts: [{id: 1}, {id: 2}, {id: 3}, {id: 4}],
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
                console.log("Rejected: " + action.payload)
            })
    }
}

export const postsSlice = createSlice(sliceOptions);
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;