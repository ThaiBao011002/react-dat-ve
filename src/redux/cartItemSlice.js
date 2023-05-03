import { createSlice } from "@reduxjs/toolkit";
import data from "../data/danhSachGhe";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : data;

const initialState = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
    },
    updateItem: (state, action) => {
      const itemUpdate = action.payload;

      const item = findItem(state.value, itemUpdate);

      if (item.length > 0) {
        state.value = delItem(state.value, itemUpdate);
        state.value = [
          ...state.value,
          {
            ...itemUpdate,
            id: item[0].id,
          },
        ];
        localStorage.setItem(
          "cartItems",
          JSON.stringify(sortItems(state.value))
        );
      }
    },
    removeItem: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(sortItems(state.value)));
    },
  },
});

const findItem = (arr, item) =>
  arr.filter(
    (e) =>
      e.slug === item.slug && e.color === item.color && e.size === item.size
  );

const delItem = (arr, item) =>
  arr.filter(
    (e) =>
      e.slug !== item.slug || e.color !== item.color || e.size !== item.size
  );

export const sortItems = (arr) =>
  arr.sort((a, b) => (a.soGhe > b.soGhe ? 1 : a.soGhe < b.soGhe ? -1 : 0));

export const { addItem, updateItem, removeItem } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
