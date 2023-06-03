//   ================================================================================================================================================================import { loadStripe } from '@stripe/stripe-js';
/*import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');

const CheckoutForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Add line items with details about the product being purchased
        { price: 'YOUR_PRODUCT_PRICE_ID', quantity: 1 },
      ],
      mode: 'payment',
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/cancel',
      paymentMethodTypes: ['card'],
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
    <h2 style={styles.title}>Secure Checkout</h2>
    <form onSubmit={handleSubmit}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={styles.input}
          placeholder="1234 5678 9012 3456"
          required // Add the required attribute
          pattern="\d{4} \d{4} \d{4} \d{4}" // Add the pattern for validation
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Expiry Date:</label>
        <input
          type="text"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          style={styles.input}
          placeholder="MM/YY"
          required // Add the required attribute
          pattern="(0[1-9]|1[0-2])\/\d{2}" // Add the pattern for validation
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>CVC:</label>
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCVC(e.target.value)}
          style={styles.input}
          placeholder="123"
          required // Add the required attribute
          pattern="\d{3}" // Add the pattern for validation
        />
      </div>
      <button type="submit" style={styles.button}>
        Pay Now
      </button>
    </form>
  </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f7f7f7', // Add a background color for a professional look
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Customize the title color
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333', // Customize the label color
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none', // Remove the button border
    borderRadius: '3px',
    cursor: 'pointer', // Show pointer cursor on hover
  },
};

export default CheckoutForm;

*/
//===================================================================================================================
/*
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_1234567890'); // Replace with your actual publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Add line items with details about the product being purchased
        { price: 'YOUR_PRODUCT_PRICE_ID', quantity: 1 },
      ],
      mode: 'payment',
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/cancel',
      paymentMethodTypes: ['card'],
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Secure Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Card Number:</label>
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                },
              },
              placeholder: '1234 5678 9012 3456',
            }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Expiry Date:</label>
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                },
              },
              placeholder: 'MM/YY',
            }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>CVC:</label>
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                },
              },
              placeholder: '123',
            }}
          />
        </div>
        <button type="submit" style={styles.button}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f7f7f7', // Add a background color for a professional look
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Customize the title color
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333', // Customize the label color
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none', // Remove the button border
    borderRadius: '3px',
    cursor: 'pointer', // Show pointer cursor on hover
  },
};

const App = () => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
  };  

export default App;
*/
//===================================================================================================================
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_1234567890'); // Replace with your actual publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        // Add line items with details about the product being purchased
        { price: 'YOUR_PRODUCT_PRICE_ID', quantity: 1 },
      ],
      mode: 'payment',
      successUrl: 'https://your-website.com/success',
      cancelUrl: 'https://your-website.com/cancel',
      paymentMethodTypes: ['card'],
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Secure Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Card Number:</label>
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  letterSpacing: '0.5px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
              placeholder: '1234 5678 9012 3456',
            }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Expiry Date:</label>
          <CardExpiryElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  letterSpacing: '0.5px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
              placeholder: 'MM/YY',
            }}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>CVC:</label>
          <CardCvcElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '3px',
                  letterSpacing: '0.5px',
                  fontFamily: 'Arial, sans-serif',
                },
              },
              placeholder: '123',
            }}
          />
        </div>
        <button type="submit" style={styles.button}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f7f7f7', // Add a background color for a professional look
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Customize the title color
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333', // Customize the label color
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none', // Remove the button border
    borderRadius: '3px',
    cursor: 'pointer', // Show pointer cursor on hover
  },
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;

