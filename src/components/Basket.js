import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../contexts/CartContext";
import { formatNumber } from "../utils";
import { DownIcon, TrashIcon, UpIcon } from "./Icons";

const Basket = () => {
  const {
    getCartItems,
    clearBasket,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Local state
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    /* const cartItems = getCartItems();
    setCartItems(cartItems); */
    setCartItems(getCartItems());
  }, [getCartItems]);

  const renderCart = () => {
    /* const cartItems = getItems(); 
    Store it in local state by using useEffect above
    */

    if (cartItems.length > 0) {
      return cartItems.map((item) => (
        <React.Fragment key={item.id}>
          <div>
            <Link to={`/products/${item.id}`}>{item.title}</Link>
          </div>

          <BasketQty>
            {item.quantity}
            <UpIcon
              width={20}
              // onClick={() => setCartItems(increaseQuantity({ id: item.id }))}
              onClick={() => setCartItems(increaseQuantity({ id: item.id }))}
            />
            <DownIcon
              width={20}
              onClick={() => setCartItems(decreaseQuantity({ id: item.id }))}
            />
            <TrashIcon
              width={20}
              onClick={() => setCartItems(removeProduct({ id: item.id }))}
            />
          </BasketQty>
          {/* 
          <BasketPrice>&pound;{item.price}</BasketPrice> 
          we can change it as:
          <BasketPrice>{formatNumber(item.price)}</BasketPrice> 
          */}
          <BasketPrice>{formatNumber(item.price)}</BasketPrice>
        </React.Fragment>
      ));
    } else {
      return <div>The basket is currently empty</div>;
    }
  };

  const renderTotal = () => {
    const cartItems = getCartItems();

    // reduce(accumulator, parameter for enumerating)
    /*
    ReadonlyArray.reduce(callbackfn: (previousValue: T, currentValue: T, 
    currentIndex: number, array: readonly T[]) => T): T

    A function that accepts up to four arguments. The reduce method calls 
    the callbackfn function one time for each element in the array.
    
    Calls the specified callback function for all the elements in an array. 
    The return value of the callback function is the accumulated result, 
    and is provided as an argument in the next call to the callback function.
    */
    const total = cartItems.reduce(
      (total, item) => (total += item.price * item.quantity),
      0
    );

    return total;
  };

  return (
    <BasketContainer>
      <BasketTitle>Shopping Basket</BasketTitle>
      <BasketButton onClick={() => navigate("/checkout")}>
        Checkout
      </BasketButton>
      <BasketTable>
        <BasketHeader>
          <h4>Item</h4>
          <h4>Quantity</h4>
          <h4>Price</h4>
        </BasketHeader>
        <BasketHeaderLine />

        <BasketHeader>{renderCart()}</BasketHeader>
        <BasketHeaderLine />
      </BasketTable>

      {/* 
      <BasketButton onClick={() => clearBasket()}>Clear</BasketButton> 
      Need to add setCartItems(clearBasket()) to be updated in local state
      */}
      <BasketButton onClick={() => setCartItems(clearBasket())}>
        Clear
      </BasketButton>

      {/* 
        <BasketTotal>Total: &pound;0</BasketTotal> 
        we should change it as:
        <BasketTotal>Total: {formatNumber(0)}</BasketTotal> 
        */}
      <BasketTotal>Total: {formatNumber(renderTotal())}</BasketTotal>
    </BasketContainer>
  );
};

export default Basket;

const BasketContainer = styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows: 0.25fr 1fr 0.25fr;
  grid-template-columns: 0.1fr 1fr 0.1fr;
`;

const BasketTable = styled.div`
  grid-column: 1 / span 3;

  grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr;
  column-gap: 20px;
  padding-left: 10px;
`;

const BasketHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 0.5fr;
`;

const BasketHeaderLine = styled.hr`
  margin-bottom: 20px;
  border: 1px solid gray;
`;

const BasketTitle = styled.h2`
  grid-column: 1 / span 2;

  padding-bottom: 20px;
`;

const BasketQty = styled.h3`
  font-size: 18px;
  font-weight: bold;
  display: grid;
  grid-template-columns: 0.1fr 0.05fr 0.1fr 0.1fr;
`;

const BasketPrice = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const BasketTotal = styled.h2`
  justify-self: end;
`;

const BasketButton = styled.button`
  border-radius: 8px;
  height: 40px;
`;
