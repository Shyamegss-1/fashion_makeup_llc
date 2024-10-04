import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router';
import { CurrencyAmount } from '../../context/currencyContext';
import { notification, Button } from 'antd';

const CheckoutForm = (props) => {
  const navigate = useNavigate();
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);
  const [totalAmounts, setTotalAmount] = useState(0);
  const { id, token } = useSelector((e) => e.userLogin.userDetail);
  const { items, totalItem, totalAmount } = useSelector((e) => e.cartReducer);
  const sumItems = () => {
    let sum = 0;
    props.response.forEach(function (item) {
      let calculation = Math.trunc(item.price);
      sum += calculation;
    });
    setTotalAmount(sum + totalAmount);
  };

  useEffect(() => {
    sumItems();
  }, [props.response]);

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="large"
        onClick={() => {
          navigate('/login');
          notification.close(key);
        }}
      >
        Login
      </Button>
    );
    notification.warning({
      message: `Notification `,
      description: 'Login To Complete  Checkout',
      duration: 3,
      placement: 'topRight',
      btn,
      key,
    });
  };

  const EmptyCartHandler = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="medium"
        onClick={() => {
          navigate('/shop');
          notification.close(key);
        }}
      >
        Continue To Shop
      </Button>
    );
    notification.info({
      message: `Notification `,
      description: 'Your cart is empty',
      duration: 3,
      placement: 'topRight',
      btn,
      key,
    });
  };

  const navigationHandler = () => {
    navigate('/checkout');
  };

  return (
    <>
      <div className="checkout-form">
        <div className="checkoutTotal">
          <h2>Shopping Cart Total</h2>
          <div className="total-chekout">
            <p>subtotal</p>
            <h6>
              <span>
                {Currency}{' '}
                {Currency == 'SAR'
                  ? Math.ceil(totalAmounts * saRates).toFixed(2)
                  : Currency == 'AED'
                  ? Math.ceil(totalAmounts * aedRates).toFixed(2)
                  : Currency == 'QAR'
                  ? Math.ceil(totalAmounts * qarRate).toFixed(2)
                  : totalAmounts?.toFixed(2)}
              </span>
            </h6>
          </div>
          <div className="total-chekout">
            <p>subtotal</p>
            <h6>
              <span>
                {Currency}{' '}
                {Currency == 'SAR'
                  ? Math.ceil(totalAmounts * saRates).toFixed(2)
                  : Currency == 'AED'
                  ? Math.ceil(totalAmounts * aedRates).toFixed(2)
                  : Currency == 'QAR'
                  ? Math.ceil(totalAmounts * qarRate).toFixed(2)
                  : totalAmounts?.toFixed(2)}
              </span>
            </h6>
          </div>
          <button
            onClick={
              !token
                ? () => openNotification()
                : totalAmounts > 0 && token
                ? () => navigationHandler()
                : totalAmounts == 0
                ? () => EmptyCartHandler()
                : null
            }
            className="btn-checkout"
          >
            PROCEED TO CHECKOUT
          </button>
          <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '10px' }}></p>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
