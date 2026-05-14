import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/user";
import { eventsApi } from "./api/eventsApi";
import { categoriesApi } from "./api/categoriesApi";
import { bookingApi } from "./api/bookingApi";
import bookingSlice from "./slices/bookingSlice";
import authSlice from "./slices/authSlice";
import locationSlice from "./slices/locationSlice";
import { paymentApi } from "./api/paymentApi";
import { adminDashboardApi } from "./api/adminDashboardApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [adminDashboardApi.reducerPath]: adminDashboardApi.reducer,

    //slices
    booking: bookingSlice,
    auth: authSlice,
    location:locationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, eventsApi.middleware, categoriesApi.middleware, bookingApi.middleware, paymentApi.middleware,adminDashboardApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
