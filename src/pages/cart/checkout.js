import { useState } from 'react';
import CartItem from './cartItem';
import CheckoutForm from './checkout-form';

const Checkout = (props) => {
  const [response, setResponse] = useState([]);
  const [cartResponse, setCartResponse] = useState([]);

  return (
    <div className="mainAbout">
      <CartItem setResponse={setResponse} setApiState={props.setApiState} />
      <CheckoutForm response={response} />
    </div>
  );
};

export default Checkout;
