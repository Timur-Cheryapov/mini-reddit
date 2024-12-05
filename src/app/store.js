import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../components/Posts/postsSlice';
import subredditsReducer from '../components/Subreddits/subredditsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        subreddits: subredditsReducer,
    }
})