import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../components/postsSlice';
import subredditsReducer from '../components/subredditsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
    }
})