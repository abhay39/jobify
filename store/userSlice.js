import { createSlice } from '@reduxjs/toolkit'

const UserDetails=createSlice({
    name:"UserDetails",
    initialState:null,
    reducers:{
        getUserDetails(state,action){
            state=action.payload;
            return state;
        }
    }
})

export const userDetailsActions=UserDetails.actions;

export default UserDetails;