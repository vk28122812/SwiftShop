import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState: {
        isAuthenticated: localStorage.getItem("isAuthenticated")==="true",
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null
    },
    reducers:{
        login(state, action){
            console.log(action.payload);
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token)
        },
        logout(state){
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

