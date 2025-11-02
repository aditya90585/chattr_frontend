import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    status:false
}

const authSlices = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.user
            console.log(action.payload.user)
            state.status = true
        }
    }
})

export const {login} = authSlices.actions

export default authSlices.reducer