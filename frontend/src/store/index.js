import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import authReducer from "./auth"
const store = configureStore({
    reducer:{
        auth: authReducer,
        cart: cartReducer
    }
});

const subscriber = () => {
    console.log(store.getState());
}

store.subscribe(subscriber);
export default store;

