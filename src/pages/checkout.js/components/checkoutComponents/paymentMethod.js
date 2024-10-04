import { Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Index from '../../../paypal';
import StripPayment from '../../../stripepayment/index';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { useSelector } from 'react-redux';
import { userPaymentStatus } from '../../../../services/apiServices/apiService';
// import Stripe from '../../../stripe/App';

function PaymentMethod(props) {
  const { id } = useSelector((e) => e.userLogin.userDetail);

  const [activeKey, setActiveKey] = useState('1');
  const [paypalStatus, SetpaypalStatus] = useState({
    paymentId: null,
    payment_status: null,
    user_email: null,
    Amuont: null,
  });
  const [stripeStatus, SetstripeStatus] = useState({
    paymentId: null,
    payment_status: null,
    user_email: null,
    Amuont: null,
  });

  let payingAmount;
  useEffect(() => {
    payingAmount == undefined ? (payingAmount = props.payingAmmount || props.payingAmmount) : (payingAmount = payingAmount);
  }, []);

  const paymentMethodHandler = (e) => {
    setActiveKey(e.target.value == 'Cod' ? '0' : e.target.value == 'stripe' ? '1' : '2');
  };

  function CustomToggle(value) {
    setActiveKey(value == 'Cod' ? '0' : value == 'stripe' ? '1' : '2');
  }
  const dataHandler = (e) => {
    if (e.target.value == 'Cod' && activeKey == 0) {
      props.setpaymnetData({
        payment_method: 'COD',
        payment_id: 0,
        payment_status: 1,
      });
    }
  };

  const datsaHandler = (e) => {
    if (e == 'Cod' && activeKey == 0) {
      props.setpaymnetData({
        payment_method: 'COD',
        payment_id: 0,
        payment_status: 1,
      });
    }
  };

  useEffect(() => {
    if (activeKey == 2 && paypalStatus.payment_status == 'COMPLETED') {
      let obj = {
        user_id: id,
        email: paypalStatus.user_email,
        payment_id: paypalStatus.paymentId,
        amount: paypalStatus.Amuont,
      };
      props.setpaymnetData({
        payment_method: 'Paypal',
        payment_id: paypalStatus.paymentId,
        payment_status: 1,
      });

      userPaymentStatus(obj).then((e) => {
        if (e.status == 200) {
          props.confirmPaymnet();
        } else {
          alert('some thing went wrong');
        }
      });
    }
  }, [paypalStatus]);

  useEffect(() => {
    if (activeKey == 1 && stripeStatus.payment_status == 'succeeded') {
      let obj = {
        user_id: id,
        email: stripeStatus.user_email,
        payment_id: stripeStatus.paymentId,
        amount: stripeStatus.Amuont,
      };
      props.setpaymnetData({
        payment_method: 'stripe',
        payment_id: stripeStatus.paymentId,
        payment_status: 1,
      });

      userPaymentStatus(obj).then((e) => {
        if (e.status == 200) {
          props.confirmPaymnet();
        } else {
          alert('some thing went wrong');
        }
      });
    }
  }, [stripeStatus]);

  return (
    <>
      <Accordion defaultActiveKey={'1'}>
        <Accordion.Item eventKey="0">
          <Accordion.Header
            onClick={() => {
              CustomToggle('Cod');
              datsaHandler('Cod');
            }}
          >
            {
              <input
                style={{ marginRight: '10px' }}
                type={'radio'}
                value={'Cod'}
                eventKey="0"
                onChange={(e) => {
                  paymentMethodHandler(e);
                  dataHandler(e);
                }}
                checked={activeKey == '0'}
              />
            }{' '}
            cash on dilivery
          </Accordion.Header>
          <Accordion.Body>
            This method is not available in your country
            {/* <Button onClick={() => props.confirmPaymnet()} type="primary">
              confirm Order
            </Button> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header
            onClick={() => {
              CustomToggle('stripe');
              datsaHandler('stripe');
            }}
          >
            {
              <input
                style={{ marginRight: '10px' }}
                type={'radio'}
                value={'stripe'}
                eventKey="1"
                onChange={(e) => {
                  paymentMethodHandler(e);
                  dataHandler(e);
                }}
                checked={activeKey == '1'}
              />
            }{' '}
            credit / debit card
          </Accordion.Header>
          <Accordion.Body>
            <StripPayment
              SetstripeStatus={SetstripeStatus}
              primaryAddress={props.primaryAddress}
              secondryAddress={props.secondryAddress}
              amount={props.payingAmmount}
              showshipEdit={props.showshipEdit}
            />
            {/* <Stripe /> */}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header
            onClick={() => {
              CustomToggle('paypal');
              datsaHandler('paypal');
            }}
          >
            {
              <input
                style={{ marginRight: '10px' }}
                type={'radio'}
                value={'paypal'}
                eventKey="2"
                onChange={(e) => {
                  paymentMethodHandler(e);
                  dataHandler(e);
                }}
                checked={activeKey == '2'}
              />
            }{' '}
            Paypal
          </Accordion.Header>
          <Accordion.Body>
            <Index SetpaypalStatus={SetpaypalStatus} amount={props.payingAmmount} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default PaymentMethod;
