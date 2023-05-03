import { configureStore } from "@reduxjs/toolkit";

import cartItemsSlice from "./cartItemSlice";

export const store = configureStore({
  reducer: {
    cartItems: cartItemsSlice,
  },
});
