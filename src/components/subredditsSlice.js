import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../utils/Reddit";

export const loadSubreddits = createAsyncThunk(
    'subreddits/getSubreddits',
    async (_, { rejectWithValue }) => {
        try {
            const subreddits = await Reddit.getSubreddits()
            return subreddits
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const sliceOptions = {
    name: 'subreddits',
    initialState: {
        subreddits: {
            '1': {title: '1'},
            '2': {title: '2'},
            '3': {title: '3'},
            '4': {title: '4'},
            '5': {title: '5'},
            '6': {title: '6'}
        },
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSubreddits.pending, (state, action) => {
                state.isLoading = true
                state.hasError = false
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                state.isLoading = false
                state.hasError = false
                state.subreddits = action.payload
            })
            .addCase(loadSubreddits.rejected, (state, action) => {
                state.isLoading = false
                state.hasError = true
                console.log("Rejected: " + action.payload)
            })
    }
}

export const subredditsSlice = createSlice(sliceOptions);
export const { setSubreddit } = subredditsSlice.actions;
export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSubreddit = (state) => state.subreddits.subreddit;

export default subredditsSlice.reducer;