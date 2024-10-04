import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    shippingAddress1: "",
    touched: {
      name: false,
      email: false,
      shippingAddress1: false,
    },
  });

  const errors = {
    name: form.name.length === 0, // Checks if name is empty (length 0)
    email: form.email.length === 0, // Checks if email is empty (length 0)
    shippingAddress1: form.shippingAddress1.length === 0, // Checks if shippingAddress1 is empty (length 0)
  };

  // keys: name, email, shippingAddress1
  // some((x) => errors[x]): It iterates through a key of our area objects
  // (name, email, shippingAddress 1) & then return true if any of these have errors
  const disabled = Object.keys(errors).some((x) => errors[x]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return {
        ...prevState,

        // Update value based on the property "name"
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    if (disabled) {
      // If form is invalid then prevent page refresh automatically
      // Not set anything in the URL
      // http://localhost:3000/checkout?name=&email=&billingAddress1=&billingAddress2=&billingCity=&shippingAddress1=&shippingAddress2=&shippingCity=
      event.preventDefault();
      return;
    }
    navigate("/orderConfirmation");
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    // Remember when update state need to have prevState and relevant data (...form.touched)
    // Prevent undefined
    setForm((prevState) => {
      return {
        ...prevState,
        touched: {
          ...form.touched,
          [name]: true,
        },
      };
    });
  };

  /* const showErrors = (field) => {
    const hasErrors = errors[field];
    const shouldShow = form.touched[field];
    return hasErrors ? shouldShow : false;
  }; */
  const showErrors = (field) => (errors[field] ? form.touched[field] : false);

  return (
    <form onSubmit={handleSubmit}>
      <CheckoutContainer>
        {/* Row 1 */}
        <CheckoutTitle>Shopping Checkout</CheckoutTitle>

        {/* Row 4 */}
        <CheckoutHeader>
          <h4>Your Details</h4>
        </CheckoutHeader>

        {/* Row 5 */}
        <CheckoutHeaderLine />

        {/* Row 6 */}
        <CheckoutTable>
          <CheckoutFormLabel>Name *</CheckoutFormLabel>
          <CheckoutFormInput
            type="text"
            name="name"
            onChange={handleChange}
            // invalid={errors["name"]}
            invalid={showErrors("name")}
            onBlur={handleBlur}
            placeholder="Enter name"
          />
          <CheckoutFormLabel>Email *</CheckoutFormLabel>
          <CheckoutFormInput
            type="text"
            name="email"
            onChange={handleChange}
            // invalid={errors["email"]}
            invalid={showErrors("email")}
            onBlur={handleBlur}
            placeholder="Enter email"
          />
        </CheckoutTable>

        {/* Row 7 */}
        <CheckoutHeader>
          <h4>Address Details</h4>
        </CheckoutHeader>

        {/* Row 8 */}
        <CheckoutHeaderLine />

        {/* Row 9 */}
        <CheckoutTable>
          <CheckoutFormLabel>Copy to shipping</CheckoutFormLabel>
          <CheckoutFormCheckbox type="checkbox" />

          <CheckoutFormLabel>Billing Address</CheckoutFormLabel>

          <CheckoutAddress>
            <input type="text" name="billingAddress1" />
            <input type="text" name="billingAddress2" />
            <input type="text" name="billingCity" />
          </CheckoutAddress>

          <CheckoutFormLabel>Shipping Address *</CheckoutFormLabel>

          <CheckoutAddress>
            <CheckoutFormInput
              type="text"
              name="shippingAddress1"
              onChange={handleChange}
              // invalid={errors["shippingAddress1"]}
              invalid={showErrors("shippingAddress1")}
              placeholder="Enter first address line"
            />
            <input type="text" name="shippingAddress2" />
            <input type="text" name="shippingCity" />
          </CheckoutAddress>
        </CheckoutTable>

        <CancelButton onClick={() => navigate("/basket")}>Cancel</CancelButton>

        <CheckoutButton disabled={disabled}>Confirm Order</CheckoutButton>
      </CheckoutContainer>
    </form>
  );
};

export default Checkout;

const CheckoutContainer = styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr 0.25fr 0.5fr;
  grid-template-columns: 0.1fr 1fr 0.1fr;
`;
const CheckoutTable = styled.div`
  grid-column: 1 / span 3;

  display: grid;
  grid-template-rows: 0.25fr 0.25fr 0.25fr 0.25fr;
  grid-template-columns: 0.1fr 0.4fr 0.1fr 0.4fr;
  column-gap: 20px;
  padding-left: 10px;
`;

const CheckoutHeader = styled.div`
  grid-column: 1 / span 3;
  padding-top: 20px;
`;
const CheckoutHeaderLine = styled.hr`
  grid-column: 1 / span 3;
  margin-bottom: 20px;
  border: 1px solid gray;
`;
const CheckoutTitle = styled.h2`
  grid-column: 1 / span 2;
  padding-bottom: 20px;
`;

const CheckoutAddress = styled.div`
  display: grid;

  grid-template-rows: 0.25fr 0.25fr 0.25fr 0.25fr;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
`;

const CheckoutFormLabel = styled.label`
  justify-self: end;
`;

const CheckoutFormCheckbox = styled.input`
  grid-column: 2 / span 3;
  justify-self: start;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  border-radius: 8px;
  height: 40px;
  grid-column: 3;
`;

const CancelButton = styled.button`
  border-radius: 8px;
  height: 40px;
  grid-column: 1;
`;

/* border-color: ${(props) => (props.invalid ? "red" : "black")}; */
/* border-width: ${(props) => (props.invalid ? "3px" : "1px")}; */
const CheckoutFormInput = styled.input`
  border-width: 1px;
  border-style: solid;

  ${(props) =>
    props.invalid &&
    `
    border-with: 3px;
    border-color: red;
  `};
`;
