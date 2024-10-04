const Storage = (cartItems) => {
  // Store some cartItems into the localStorage
  /* localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
    ); */

  // Store some cartItems into the sessionStorage
  sessionStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const CartReducer = (state, action) => {
  // debugger;

  let index = -1;

  // We find the id of each cartItems then add into the cart
  // If the id of cartItems is existed then increase the quantity
  if (action.payload)
    index = state.cartItems.findIndex((x) => x.id === action.payload.id);

  /* GOOD WAY because React's state management relies on the
  concept of immutability => DO NOT directly modify the
  existing state object. Instead, you create a new state object
  with the desired changes. */
  let newItems = [...state.cartItems]; // COPY the array of state

  switch (action.type) {
    case "ADD":
    case "INCQTY":
      if (index === -1) {
        // state.cartItems.push({ ...action.payload, quantity: 1 }); // BAD WAY
        newItems.push({ ...action.payload, quantity: 1 }); // GOOD WAY
      } else {
        // state.cartItems[index].quantity++; // BAD WAY
        // newItems[index].quantity++; // GOOD WAY
        // Create a new object for the updated item
        newItems[index] = { ...newItems[index], quantity: newItems[index].quantity + 1 };
      }

      break;

    case "REMOVE":
      if (index > -1) {
        // state.cartItems.splice(index, 1); // BAD WAY

        /* Select all the items which do not currently match the ID
        of the one that we're trying to remove */

        /* Filter Method: It returns the element of an array that meet the condition
        specified in a callback function */
        newItems = state.cartItems.filter((x) => x.id !== action.payload.id); // GOOD WAY
      }
      break;

    case "DECQTY":
      /* if (index > -1) {
        state.cartItems[index].quantity--;
        // if (state.cartItems[index].quantity === 0) {
        //  state.cartItems.splice(index, 1);
        // }
      } */ // BAD WAY

      if (index > -1) {
        if (newItems[index].quantity > 1) newItems[index].quantity--; // GOOD WAY

        //state.cartItems[index].quantity--; // BAD WAY
      }
      break;

    case "CLEAR":
      // state.cartItems = []; // BAD WAY
      newItems = []; // GOOD WAY
      break;

    default:
  }

  state.cartItems = newItems;
  Storage(newItems);
  // return state;
  
  // return { ...state, cartItems: newItems };
  return { ...state };
};
