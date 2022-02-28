import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: ''
    },
    reducers: {
        authenticate: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log("user autheticated from redux :)")
            state.value = localStorage.getItem('user') 
        },
        forget: state => {
            state.value = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { authenticate, forget } = authSlice.actions

export default authSlice.reducer