import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import CommissionReducer from "./slices/commissionSlice";

export const store = configureStore({
    reducer: {
      user:userReducer,
      commission:CommissionReducer,
    },
});