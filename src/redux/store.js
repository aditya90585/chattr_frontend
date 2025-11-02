import { configureStore } from "@reduxjs/toolkit"
import authSlices from "../redux/Slices/authSlices"
import postSlices from "../redux/Slices/postSlices"
export const store = configureStore({
    reducer: {
        auth: authSlices,
        posts: postSlices
    }
})

