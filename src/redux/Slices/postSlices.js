import { createSlice } from "@reduxjs/toolkit";
const initialState = {
     posts:[]
}
const postSlices =  createSlice({
    name:"post",
    initialState,
    reducers:{
        showPosts:(state,action)=>{
             state.posts = [...state.posts,...action.payload]
        },
        clearPosts:(state,action)=>{
            state.posts = []
        }

    }
})

export const {showPosts,clearPosts} = postSlices.actions

export default postSlices.reducer