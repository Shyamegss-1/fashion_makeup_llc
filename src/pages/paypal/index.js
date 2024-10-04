import { useEffect } from 'react';
import { notification } from 'antd';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

// This values are the props in the UI
const currency = 'USD';
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, amount, SetpaypalStatus }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  const openNotification = (status) => {
    notification[status]({
      message: 'Payment status',
      description: status == 'success' ? ' payment successfull' : 'something went wrong try again !!',
      duration: 7,
    });
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const email = details.payer.email_address;
            const { amount } = details.purchase_units[0];
            const { id, status } = details;
            openNotification('success');
            SetpaypalStatus({
              paymentId: id,
              payment_status: status,
              user_email: email,
              Amuont: amount.value,
            });
          });
        }}
        onCancel={(data, actions) => {
          return actions.order.capture().then(function () {
            openNotification('error');
          });
        }}
      />
    </>
  );
};

export default function Index({ amount, SetpaypalStatus }) {
  return (
    <div className="paypal-form" style={{ maxWidth: '750px', minHeight: '200px' }}>
      <PayPalScriptProvide
        options={{
          'client-id': 'AXlwJbS3Gaq4CNia2wK1OLyouSOwr3jXyhjHZMvnkwQV049Z0R_aoQC1yz6IwB-pY0qXOX-QjAaKUgP5',
          components: 'buttons',
          currency: 'USD',
        }}
      >
        <ButtonWrapper currency={currency} amount={amount} SetpaypalStatus={SetpaypalStatus} showSpinner={true} />
      </PayPalScriptProvide>
    </div>
  );
}
