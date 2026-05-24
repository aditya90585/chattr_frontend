import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    status:null
}

const authSlices = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload.user
            state.status = true
        },
        logout:(state,action) =>{
            state.userData = null,
            state.status = false
        }
    }
})

export const {login,logout} = authSlices.actions

export default authSlices.reducer