import React, { useContext, useEffect, useState } from 'react';
import headIcon from '../../images/about/beauty-icon1.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CurrencyAmount } from '../../context/currencyContext';

const BillingInfo = (props) => {
  const { items } = useSelector((e) => e.cartReducer);
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);
  const [data, setData] = useState();
  const [ttAmonunt, setttAmount] = useState(0);

  return (
    <div className="abSidebar">
      <h3 style={{ backgroundImage: `url(${headIcon})` }}>Order Summary </h3>
      <div className="cick_total">
        <p>Shipping and additional costs are calculated based on values you have entered.</p>
        <ul>
          <li>Order Subtotal</li>
          <li>
            {Currency}{' '}
            {Currency == 'SAR'
              ? Math.ceil(props.totalAmount * saRates).toFixed(2)
              : Currency == 'AED'
              ? Math.ceil(props.totalAmount * aedRates).toFixed(2)
              : Currency == 'QAR'
              ? Math.ceil(props.totalAmount * qarRate).toFixed(2)
              : props.totalAmount}{' '}
          </li>
        </ul>
        <ul>
          <li>Total</li>
          <li>
            {' '}
            {Currency}{' '}
            {Currency == 'SAR'
              ? Math.ceil(props.totalAmount * saRates).toFixed(2)
              : Currency == 'AED'
              ? Math.ceil(props.totalAmount * aedRates).toFixed(2)
              : Currency == 'QAR'
              ? Math.ceil(props.totalAmount * qarRate).toFixed(2)
              : props.totalAmount}
            {Currency == 'QAR'}
          </li>
        </ul>
        <ul>
          <li>Total in USD</li>
          <li>
            {' '}
            USD{props.totalAmount}{' '}
            <Tooltip title={'we only accept payment in USD , so your total amount is converted.'}>
              <InfoCircleOutlined />
            </Tooltip>{' '}
          </li>
        </ul>
      </div>
      <Link to={'/shop'}>
        <button className="btn-next cnt_shping">continue shopping</button>
      </Link>
    </div>
  );
};
export default BillingInfo;
