import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { CartContext } from '../Cart/CartProvider';
import { UserContext } from '../User/UserProvider';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router
import axios from 'axios';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(UserContext);
  const { calculateTotalAmount, clearCart, cartItems } = useContext(CartContext); // Access calculateTotalAmount function
  const navigate = useNavigate(); 

  const addOrderToHistory = async (userEmail, cartItems) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/users/${userEmail}/history/add`, { userEmail, cartItems });
      const addingSuccess = response.data;
      if (addingSuccess) {
        clearCart();
        console.log("Order added to history");
      } else {
        console.log("Order not added to history");
      }
    } catch (error) {
      console.error('Error adding order to order history:', error);
    }
  };
  
  
  const totalAmount = calculateTotalAmount(); // Calculate the total price

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.log('User not logged in');
      alert('Please login to checkout');
      navigate('/account');
      return;
    }
  
    if (!stripe || !elements) {
      return;
    }
  
    try {
      const cardElement = elements.getElement(CardNumberElement);
  
      // Confirm the card payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        console.error('Error creating payment method:', error);
        return;
      }
  
      // Send a request to the server to create a payment intent
      const response = await axios.post('http://localhost:4000/api/create-payment-intent', {totalAmount});

      console.log('Response:', response.data);
  
      const { clientSecret } = response.data;
  
      // Confirm the payment intent with the payment method
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });
  
      if (confirmError) {
        console.error('Error confirming payment:', confirmError);
        return;
      }

      console.log('Payment successful!');
      addOrderToHistory(user.email, cartItems);
      navigate('/checkout/success'); 
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Secure Checkout</h2>
      <h4>Total: ${totalAmount}</h4>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Card Number:</label>
          <CardNumberElement
            options={{
              style: {
                base: {
                  fontSize: '11px',
                  width: '300%', // Increase the width value to make it longer
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
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f7f7f7', 
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
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

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
