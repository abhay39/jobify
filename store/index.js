import { configureStore } from "@reduxjs/toolkit";
import UserDetails from "./userSlice";

const JobifyStore=configureStore({
    reducer:{
        userInformation: UserDetails.reducer,
    }
})

export default JobifyStore;