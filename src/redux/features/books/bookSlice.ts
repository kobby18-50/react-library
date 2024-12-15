import { PayloadAction, createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../../utils";

const initialBookState = {
    loading : false,
    error : ''
}


export const fetchUsers = createAsyncThunk('user/fetchBooks', () => {
    return axios.get(`${BASE_URL}/books/all`)
    .then((response) => response.data)
})

const bookSlice = createSlice({
    name : 'book',
    initialState : initialBookState,
    reducers : {
        start : (state) => {
            state.loading = true
        },

        fetchSuccess : (state) => {
            state.loading = false
        },

        fetchFailed : (state, action : PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        }
    }
    
})

export default bookSlice.reducer

export const {start, fetchSuccess, fetchFailed} = bookSlice.actions