import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface LocationState{
    location:string | null;
}

const initialState:LocationState = {
    location:null
}

const locationSlice = createSlice({
    name:"location",
    initialState,
    reducers:{
        setLocation:(state,action:PayloadAction<{location:string}>) => {
            state.location = action.payload.location;
        }
    }
})

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;