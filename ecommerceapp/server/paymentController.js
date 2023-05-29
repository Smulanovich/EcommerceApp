// paymentController.js
require('dotenv').config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product',
            },
            unit_amount: amount, // The dynamic amount you received from the client
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4000/success',
      cancel_url: 'http://localhost:4000/cancel',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Error creating checkout session');
  }
};

module.exports = {
  createCheckoutSession,
};
