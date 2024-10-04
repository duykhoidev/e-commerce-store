import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";

export const CartContext = createContext();

// Local Storae
/* const Storage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : []; */

// SessionStorage
const Storage = sessionStorage.getItem("cart")
  ? JSON.parse(sessionStorage.getItem("cart"))
  : [];

// Store some cartItems
// const initialState = { cartItems: [] };
const initialState = { cartItems: Storage };

const CartContextProvider = ({ children }) => {
  const [modifiedState, dispatch] = useReducer(CartReducer, initialState);

  const addProduct = (payload) => {
    dispatch({ type: "ADD", payload });
    return modifiedState.cartItems;

    /* // Ensure immutability: create a new copy of the state array
    const newItems = [...modifiedState.cartItems];
    newItems.push({ ...payload, quantity: 1 });

    // Update state and return new state object
    return { ...modifiedState, cartItems: newItems }; */
  };

  const removeProduct = (payload) => {
    dispatch({ type: "REMOVE", payload });
    return modifiedState.cartItems;
  };

  const increaseQuantity = (payload) => {
    dispatch({ type: "INCQTY", payload });
    return modifiedState.cartItems;
  };

  const decreaseQuantity = (payload) => {
    dispatch({ type: "DECQTY", payload });
    return modifiedState.cartItems;
  };

  const clearBasket = () => {
    dispatch({ type: "CLEAR", payload: undefined });
    return modifiedState.cartItems;
  };

  const getCartItems = () => {
    return modifiedState.cartItems;
  };

  /*
  // Without spreading
  const contextValues = {
    addProduct,
    cartItems: initialState.cartItems,
  };

  With spreading
  const contextValues = { addProduct, ...initialState };
  */

  const contextValues = {
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearBasket,
    getCartItems,
    ...modifiedState,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
