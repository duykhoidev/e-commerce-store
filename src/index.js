import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartContextProvider from "./contexts/CartContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Solution 1: Without React.StrictMode
root.render(
  // Do not have React.StrictMode to avoid clicking the button Add to Basket then add 2 items instead of 1
  // <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  // </React.StrictMode>
);

// Solution 2: With React.StrictMode (Need to use memo in CartContext.js)
/* root.render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>
);
 */