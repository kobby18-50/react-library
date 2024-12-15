import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type USER = {
    user : {
        firstname : string,
        lastname : string,
    },
    token : string
}
const initialUserState = {
    user : {
        firstname : '',
        lastname : '',
        token : ''
    }
}


const userSlice = createSlice({
    name : 'user',
    initialState : initialUserState,
    reducers : {
        getUser : (state, action : PayloadAction<USER>) => {

            state.user.firstname = action.payload.user.firstname
            state.user.lastname = action.payload.user.lastname
            state.user.token = action.payload.token
        }
    }
})

export default userSlice.reducer
export const {getUser} = userSlice.actions