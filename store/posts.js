import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const slice = createSlice({
    name: 'posts',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPosts: (state) => ({
            ...state,
            isLoading: true,
        }),
        fetchPostsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload,
        }),
        fetchPostsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload,
        }),
    },
});

export const { fetchPosts, fetchPostsResolve, fetchPostsReject } = slice.actions;

export const selectPostsLoading = (state) => state.posts.isLoading;
export const selectPostsData = (state) => state.posts.data;

export const getPostsAsync = () => async (dispatch) => {
    dispatch(fetchPosts());
    const { data } = await axios.get('https://simple-blog-api.crew.red/posts');
    dispatch(fetchPostsResolve(data));
};

export default slice.reducer;
