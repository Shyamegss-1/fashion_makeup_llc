import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './paymentForm';

const PUBLIC_KEY =
  'pk_live_51LXl9QLz48AhdKMG088Dktny0kDPOe8wPl86LmLYi2X2W836z4NHQAbA25lOJCBRmySEeYSFgw52Ar2xHMvR953f00LYPchVgo';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripPayment(props) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        showshipEdit={props.showshipEdit}
        SetstripeStatus={props.SetstripeStatus}
        primaryAddress={props.primaryAddress}
        secondryAddress={props.secondryAddress}
        amount={props.amount}
      />
    </Elements>
  );
}
