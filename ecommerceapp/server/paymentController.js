// paymentController.js
require('dotenv').config();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// Process the payment using Stripe
async function processPayment(paymentMethodId, totalAmount) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      return paymentIntent.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Error processing payment');
  }
}

exports.processPayment = processPayment;