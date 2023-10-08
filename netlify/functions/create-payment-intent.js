// dotenv is by default added with react, but as this function
// will be run in an isolated environment where there's no react
// we need to have explicit dotenv dependency to work with ENV variables
require('dotenv').config();

const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

exports.handler = async event => {
  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
