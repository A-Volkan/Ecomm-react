import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
};

// for the cart
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload; // this will set the items
        },
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload]; // this will add the item to the cart
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item._id !== action.payload._id // this will filter out the item from the cart
            );
        },
        // this will increase and decrease the count of the item in the cart
        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item._id === action.payload._id) {
                    return { ...item, count: item.count + 1 };
                }
                return item;
            });
        },
        decreaseCount: (state, action) => {
            state.cart = state.cart
                .map((item) => {
                    if (item._id === action.payload._id) {
                        return { ...item, count: item.count - 1 };
                    }
                    return item;
                })
                .filter((item) => item.count !== 0);
        },
        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen; // this will open and close the cart
        },
    }
});
export const { addToCart, removeFromCart, increaseCount, decreaseCount, setIsCartOpen } = cartSlice.actions;
export const { setItems } = cartSlice.actions;
export default cartSlice.reducer; 