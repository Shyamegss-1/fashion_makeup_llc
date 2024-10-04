import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import logo2 from '../../../images/logo/image (4).png';
import { Button } from 'antd';
import html2pdf from 'html2pdf.js';

const Invoice = (props) => {
  const [state, setstate] = useState({
    address: null,
    paymentInformation: null,
    price: null,
    name: null,
    quantity: null,
    orderid: null,
  });

  useEffect(() => {
    props.invoiceData.map((e) => {
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

  const download = () => {
    const htmlFormat = document.getElementById('pdfdownload');
    const opt = {
      margin: 0,
      filename: 'profile.pdf',
      html2canvas: { width: 2000, height: 1500, scale: 5 },
      jsPDF: { unit: 'px', format: [1754, 1980] },
    };

    html2pdf()
      .from(htmlFormat)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then(() => {})
      .save();
  };

  return (
    <div className="table_invoice-mina" id="pdfdownload" onClick={(e) => e.stopPropagation()}>
      <div className="invoice_header">
        <div className="cndme">
          <div className="img">
            <img src={logo2} />
          </div>
          <p>FASHION AND MAKE-UP LLC</p>
        </div>
        <h3>INVOICE</h3>
      </div>
      <div className="invoice_header">
        <div className="cndme">
          <p>
            Hello,{state?.name == null ? 'name' : state?.address.fname}. <br /> Thank you for your order.
          </p>
        </div>
        <h2>ORDER #{state?.name == null ? 'name' : state?.orderid}</h2>
      </div>
      <div className="table_dasd">
        {' '}
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
        <div className="invoice-amount">
          <ul>
            <li>SUBTOTAL</li>
            <li>{state?.name == null ? 'name' : state?.price}</li>
          </ul>
          <ul>
            <li>SHIPPING & HANDLING</li>
            <li>0</li>
          </ul>
          <ul>
            <li>Total </li>
            <li>{state?.name == null ? 'name' : state?.price}</li>
          </ul>
        </div>
        <section class="additional-info">
          <div class="ship_paymnet-info">
            <div class="columns">
              <h5>Billing Information</h5>
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
            <div class="columns">
              <h5>Payment Information</h5>
              <p>complete</p>
            </div>
          </div>
        </section>
      </div>
      <Button onClick={download} danger>
        Download
      </Button>
    </div>
  );
};

export default Invoice;
