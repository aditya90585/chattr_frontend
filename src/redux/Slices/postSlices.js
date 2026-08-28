import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: []
}
const postSlices = createSlice({
    name: "post",
    initialState,
    reducers: {
        showPosts: (state, action) => {
            state.posts = [...state.posts, ...action.payload]
        },
        clearPosts: (state, action) => {
            state.posts = []
        },
        addPost: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        },
        deletePostState: (state, action) => {
            const rawPosts = state.posts
            const finalPostData = rawPosts.filter((post) => post._id != action.payload)
            state.posts = finalPostData
        }

    }
})

export const { showPosts, clearPosts, addPost,deletePostState } = postSlices.actions

export default postSlices.reducer