import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchZipDetails } from "../http";
import { loadStripe } from "@stripe/stripe-js";

function Checkout() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [input, setInput] = useState({
    name: "",
    street: "",
    zip: "",
    city: "",
    state: "",
  });
  const cart = useSelector((state) => state.cart);
  const [error, setError] = useState("");
  const items = useSelector((state) => state.cart);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  function returnBack() {
    navigate("/shop");
  }

  useEffect(() => {
    if (items.length === 0) {
      returnBack();
    }
  }, [items, returnBack]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  }

  async function handleZipInput() {
    const value = input.zip;
    if (!isNaN(value) && value.trim() !== "") {
      const result = await fetchZipDetails(value);
      if (result.Status == "Error") {
        setInput((prevInput) => ({
          ...prevInput,
          city: "",
          state: "",
        }));
        setError("Zip not found");
      } else {
        setInput((prevInput) => ({
          ...prevInput,
          city: result.PostOffice[0].District,
          state: result.PostOffice[0].State,
        }));
        setError("");
      }
    } else {
      setError("Zip must only contain numbers");
    }
  }

  async function handlePayment(e) {
    const stripe = await loadStripe(
      "pk_test_51QMYgqDjznTMyN6hZeK37DtWnp8UEx60RkKLUn3HUN4SsQIJo7mwy3NTdLVmaacLwU7GD7SATofi8nel5OdkcO1k00FOLuKG5i"
    );
    // console.log('Address submitted:',input);
    // Redirect to payment link or handle payment process

    const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        products: cart
      }),
    });

    const session = await response.json();
    const redirect = stripe.redirectToCheckout({
      sessionId: session.id
    })
  }

  function handleSubmit(){}
  return (
    <div className="address-container">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            pattern="[A-Za-z\s]+"
            title="Name should contain only alphabets and spaces."
            value={input.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="street">Street address</label>
          <input
            required
            type="text"
            id="street"
            name="street"
            value={input.street}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zip">ZIP code</label>
          <input
            required
            type="text"
            id="zip"
            name="zip"
            value={input.zip}
            onChange={handleChange}
            onBlur={handleZipInput}
            autoComplete="new-zip"
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            disabled
            type="text"
            id="city"
            name="city"
            defaultValue={input.city}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            disabled
            type="text"
            id="state"
            name="state"
            defaultValue={input.state}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="button" onClick={handlePayment}>
          Pay ₹ {totalPrice}
        </button>
        <button type="button" onClick={returnBack}>
          Return Home
        </button>
      </form>
    </div>
  );
}
export default Checkout;
