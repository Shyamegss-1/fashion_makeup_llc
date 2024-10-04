import React, { useMemo } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import './paymentStyle.css';
import masterCard from '../../images/logo/Mastercard-Logo.png';
import visa from '../../images/logo/Visa_Inc._logo.svg.png';
import americanExpress from '../../images/logo/American-Express-logo.png';
import dicCard from '../../images/logo/dic-card.png';
import japanCard from '../../images/logo/JCB_logo.svg.png';
import chinaUnion from '../../images/logo/unionpay-logo-D3F9908811-seeklogo.com.png';
import frnchBank from '../../images/logo/french-bank.png';
import { notification, message } from 'antd';

const openNotification = (status) => {
  notification[status]({
    message: 'Payment status',
    description: status == 'success' ? ' payment successfull' : 'something went wrong try again !!',
    duration: 7,
  });
};
const ErrorMessages = (message) => {
  notification.error({
    message: 'Payment Decline',
    description: message,
    duration: 7,
  });
};
const ExceddingAmount = () => {
  notification['error']({
    message: 'Payment status',
    description: 'YOUR AMOUNT SHOULD BE LESS THAN 10000$',
    duration: 7,
  });
};
const openMessage = () => {
  const key = 'request';
  message.loading({ content: 'requesting your payment...', key }, 6000);
};
const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          border: '1px solid gray',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize],
  );

  return options;
};

const PaymentForm = ({ amount, SetstripeStatus, secondryAddress, showshipEdit, primaryAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();
    openMessage();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (amount > 10000) {
      ExceddingAmount();
    } else {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          address: {
            city: primaryAddress.city,
            country: 'US',
            line1: primaryAddress.street,
            line2: null,
            postal_code: primaryAddress.zip,
            state: primaryAddress.state,
          },
          email: primaryAddress.email,
          name: primaryAddress.fname,
          phone: primaryAddress.phone,
        },
      });

      if (paymentMethod == undefined) {
        ErrorMessages('Wrong Card details');
      }

      const response = await fetch('https://limitless-stream-21545.herokuapp.com/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: paymentMethod.id,
          amount: amount * 100,
          address: showshipEdit ? secondryAddress : primaryAddress,
          currency: 'USD',
          country: 'US',
        }),
      });
      const data = await response.json();
      // console.log(data);
      const confirmPayment = await stripe.confirmCardPayment(data.clientSecret);

      const { paymentIntent } = confirmPayment;
      // console.log(confirmPayment, response);

      if (confirmPayment?.paymentIntent?.status === 'succeeded') {
        SetstripeStatus({
          paymentId: paymentIntent.payment_method,
          payment_status: paymentIntent.status,
          user_email: primaryAddress.email,
          Amuont: paymentIntent.amount,
        });
        openNotification('success');
      } else {
        ErrorMessages(confirmPayment.error.message);
      }
    }
  };

  return (
    <form className="payment-form-stripe" onSubmit={handleSubmit}>
      <div className="acceptable_cards">
        <ul>
          <li>
            <img src={masterCard} />
          </li>
          <li>
            <img src={visa} />
          </li>
          <li>
            <img src={americanExpress} />
          </li>
          <li>
            <img src={dicCard} />
          </li>
          <li>
            <img src={japanCard} />
          </li>
          <li>
            <img src={chinaUnion} />
          </li>
          <li>
            <img src={frnchBank} />
          </li>
        </ul>
      </div>
      <label>
        Card number
        <CardNumberElement options={options} />
      </label>
      <label>
        Expiration date
        <CardExpiryElement options={options} />
      </label>
      <label>
        CVC
        <CardCvcElement options={options} />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;

import { useEffect, useState } from 'react';

function useResponsiveFontSize() {
  const getFontSize = () => (window.innerWidth < 450 ? '16px' : '18px');
  const [fontSize, setFontSize] = useState(getFontSize);

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  return fontSize;
}
