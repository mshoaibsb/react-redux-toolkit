import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    token: '',
    user: localStorage.getItem('user') || '',
    loading: false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loggin: (state, action) => {
            state = {...action.payload}
            console.log('state', state);
        },
    }
})

export const { loggin, loading } = authSlice.actions;

export default authSlice.reducer;