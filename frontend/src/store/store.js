import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../actions/userSlice"

export const store = configureStore({
    reducer:{
        user : userReducer,
    }
})