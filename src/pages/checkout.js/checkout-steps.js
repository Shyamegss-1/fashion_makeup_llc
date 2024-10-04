import React from 'react';
import CheckTest from './components/testingPage';

const CheckOutSteps = (props) => {
  return (
    <div className="checkout-steps">
      <CheckTest totalAmount={props.totalAmount} setTotalAmount={props.setTotalAmount} setApiState={props.setApiState} />
    </div>
  );
};
export default CheckOutSteps;
