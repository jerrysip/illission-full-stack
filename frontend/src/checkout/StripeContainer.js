import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51IdNyyDdUkG2etErS4Blj1T6aIFYYEEoSr9TqK4jM3MVaWyBvZVp4tBFNgBEKYP4P2xMKBzX6OqvADrk6rycT6sy00vAwG16w1";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
