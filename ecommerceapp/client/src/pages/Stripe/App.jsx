import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//import CheckoutForm from './CheckoutForm';
import CheckoutForm from './path/to/CheckoutForm';
const stripePromise = loadStripe('pk_test_1234567890'); // Replace with your actual publishable key

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
