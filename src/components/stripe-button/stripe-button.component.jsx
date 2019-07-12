import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
// import keys from '../../keys'

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = process.env.STRIPE_KEY;
  
  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }
  
  return (
    <StripeCheckout 
      label = 'Pay Now'
      name = 'Great Clothing Ltd.'
      billingAddress
      shippingAddress
      image = 'https://svgshare.com/i/CUz.svg'
      description={`Your total price is $${price}`}
      amount = {priceForStripe}
      panelLabel = 'Pay Now'
      token = {onToken}
      stripeKey = {publishableKey}
    />
  )
};

export default StripeCheckoutButton;