import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/books/bookSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer : {
        book : bookReducer,
        user : userReducer
    }
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch