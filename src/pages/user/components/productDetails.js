import React from 'react';
import Table from 'react-bootstrap/Table';
import logo2 from '../../../images/logo/image (4).png';
import { useState, useEffect } from 'react';

const ProductDetails = (props) => {
  const [state, setstate] = useState({
    address: null,
    paymentInformation: null,
    price: null,
    name: null,
    quantity: null,
    orderid: null,
  });
  useEffect(() => {
    props.productData.map((e) => {
      setstate({
        ...state,
        address: e.billingInfo,
        paymentInformation: e.paymentInformation,
        price: e.price,
        name: e.product,
        quantity: e.quantity,
        orderid: e.orderId,
      });
    });
  }, []);

  return (
    <div className="order_product-details" onClick={(e) => e.stopPropagation()}>
      <div className="invoice_header">
        <div className="cndme">
          <div className="img">
            <img src={logo2} />
          </div>
          <p>FASHION AND MAKE-UP LLC</p>
        </div>
        <h3>Order Status</h3>
      </div>
      <div class="productDetails">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity </th>
              <th>Price </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state?.name == null ? 'name' : state?.orderid}</td>
              <td>{state?.name == null ? 'name' : state?.name[0]}</td>
              <td>Cosmetic</td>
              <td>{state?.name == null ? 'name' : state?.quantity[0]}</td>
              <td>{state?.name == null ? 'name' : state?.price}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div class="shippingDetails">
        <h5>Shipping Information</h5>
        <p>
          {state?.name == null ? 'name' : state?.address.fname}
          <br />
          {state?.name == null ? 'name' : state?.address.street}
          <br />
          {state?.name == null ? 'name' : state?.address.city}
          <br />
          {state?.name == null ? 'name' : state?.address.zip}
        </p>
      </div>
      <div class="order-paymnet-status">
        <p>
          Order Status : <span style={{ color: '#1d39c4' }}>processing</span>{' '}
        </p>
        <p>Payment Status: {state?.name == null ? 'name' : <span style={{ color: '#1d39c4' }}>{'complete'}</span>}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
