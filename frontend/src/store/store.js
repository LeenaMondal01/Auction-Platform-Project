import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import CommissionReducer from "./slices/commissionSlice";
import auctionReducer from "./slices/auctionSlice";
import bidReducer from "./slices/bidSlice";
import superAdminReducer from "./slices/superAdminSlice";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    commission: CommissionReducer,
    auction: auctionReducer,
    bid: bidReducer,
    superAdmin: superAdminReducer,
    forgotPassword: forgotResetPasswordReducer
  },
});
