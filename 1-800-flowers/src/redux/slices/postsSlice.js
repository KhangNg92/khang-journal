import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
    error: "",
    updatedPost: {},
};

const startLoading = (state) => {
    state.isLoading = true
}

const postsSlice = createSlice({
    name: "Posts",
    initialState,
    reducers: {
        getPostsStart: startLoading,
        getPostsSuccess: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
        },
        getPostsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updatePostSlice: (state, action) => {
            const foundIndex = state.posts.findIndex((post) => post.id === action.payload.id)
            state.updatedPost = action.payload;
            state.posts.splice(foundIndex, 1, action.payload)
        },
        clearUpdatedPostSlice: (state, action) => {
            state.updatedPost = initialState.updatedPost
        }
    }
})

export const {
    getPostsStart,
    getPostsSuccess,
    getPostsFailure,
    updatePostSlice,
    clearUpdatedPostSlice
} = postsSlice.actions;

export default postsSlice.reducer;