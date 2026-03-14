import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/user";
import { eventsApi } from "./api/eventsApi";
import { categoriesApi } from "./api/categoriesApi";
import { bookingApi } from "./api/bookingApi";
import bookingSlice from "./slices/bookingSlice";
import authSlice from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,

    //slices
    booking: bookingSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, eventsApi.middleware, categoriesApi.middleware, bookingApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
