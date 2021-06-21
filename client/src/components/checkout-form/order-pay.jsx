import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
  "pk_test_51J44goHv3poLQbEV6mJlU5727tsB8oiwkFQBSOn7IueJqNqei3YSXVLLDyV1txIqiIYDWtIJtXmYoAGSllbtignJ00M3eepRCP"
);

export default function App({ cartItems, total, handlePay, user }) {
  return (
    <div style={{ width: "100%" }}>
      <Elements stripe={promise}>
        <CheckoutForm
          cartItems={cartItems}
          total={total}
          handlePay={handlePay}
          user={user}
        />
      </Elements>
    </div>
  );
}
