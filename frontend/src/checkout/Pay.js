import React from "react";
// Components
import PaymentForm from "./PaymentForm";
// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// Styles
import "./Pay.css";

const stripePromise = loadStripe(
  "pk_test_51IdNyyDdUkG2etErS4Blj1T6aIFYYEEoSr9TqK4jM3MVaWyBvZVp4tBFNgBEKYP4P2xMKBzX6OqvADrk6rycT6sy00vAwG16w1"
);

export default function Pay() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
