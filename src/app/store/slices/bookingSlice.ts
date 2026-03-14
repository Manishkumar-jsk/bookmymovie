import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
    eventId: string,
    type: string,
    price: number,
    quantity: number,
    totalAmount: number
}
const initialState: BookingState = { eventId: '', type: '', price: 0, quantity: 0, totalAmount: 0 };
const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBooking: (state, action: PayloadAction<BookingState>) => {
            return action.payload;
        },
        updateBooking: (state, action: PayloadAction<number>) => {
            state.quantity = action.payload,
            state.totalAmount = state.price * action.payload
        },
        clearBooking: () => initialState
    }
});

export const { setBooking, updateBooking, clearBooking } = bookingSlice.actions

export default bookingSlice.reducer;