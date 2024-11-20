import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItemQuantity(state, action) {
      const existingCartItemIndex = state.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      const existingCartItem = state[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        state[existingCartItemIndex] = updatedItem;
      } else {
        state.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
        });
      }
    },
    updateItemQuantity(state, action) {
      const updatedItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedItem = {
        ...state[updatedItemIndex],
      };
      updatedItem.quantity = action.payload.amount;
      if (updatedItem.quantity <= 0) {
        state.splice(updatedItemIndex, 1);
      } else {
        state[updatedItemIndex] = updatedItem;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
