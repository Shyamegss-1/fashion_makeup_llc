import { Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import ShipAddress from './checkoutComponents/address';
import PaymentMethod from './checkoutComponents/paymentMethod';
import OrderPrivew from './checkoutComponents/orderPreview';
import {
  userDeleteAllCartItems,
  userOrderPostService,
  userPrimAddService,
  userPrimeAddressUpdateService,
  userPrimPostService,
  userSecAddService,
  usersecndAddressUpdateService,
  userSecPostService,
} from '../../../services/apiServices/apiService';
import { useSelector } from 'react-redux';
import { Button, Result, message, Empty } from 'antd';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './checkoutComponents/checkout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

const CheckTest = (props) => {
  const { email, username, id } = useSelector((e) => e.userLogin.userDetail);
  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState('0');
  const [count, setCount] = useState(0);
  const [addState, setAddState] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [orderState, setOrderState] = useState(false);
  const [preview, setPreview] = useState([]);
  const [showEdit, hideEdit] = useState(false);
  const [showshipEdit, hideshipEdit] = useState(false);
  const [shipeditMdoal, shipHideModal] = useState(false);
  const [popmodal, setPopmodal] = useState(false);
  const [primarystate, setPrimarystate] = useState(false);
  const [secondarystate, setSecondarystate] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [shipModal, setShipModal] = useState(false);
  const [isOrderItems, setisOrderItems] = useState(false);
  const [paymentData, setpaymnetData] = useState({
    payment_method: null,
    payment_id: null,
    payment_status: 1,
    status: 'processing',
  });

  const [primaryAddress, setprimaryAddress] = useState({
    fname: ' ',
    email: ' ',
    user_id: id,
    street: '',
    state: ' ',
    city: ' ',
    zip: ' ',
    phone: ' ',
  });
  const [secondryAddress, setsecondryAddress] = useState({
    fname: ' ',
    email: ' ',
    user_id: id,
    street: '',
    state: ' ',
    city: ' ',
    zip: ' ',
    phone: ' ',
  });

  const AddressPrime = () => {
    message.info('Enter your address to view order preview', 4);
  };

  useEffect(() => {
    const newArr2 = preview?.map((v) =>
      Object.assign(v, {
        payment_method: paymentData.payment_method,
        payment_id: paymentData.payment_id,
        payment_status: paymentData.payment_status,
        status: 'processing',
        primary_address: 1,
        secoundry_address: showshipEdit ? 1 : 0,
        add_currency: 'USD',
      }),
    );
    setOrderList(newArr2);
  }, [count, paymentData]);

  const corderListhandler = () => {
    const newArr2 = preview?.map((v) =>
      Object.assign(v, {
        payment_method: paymentData.payment_method,
        payment_id: paymentData.payment_id,
        payment_status: paymentData.payment_status,
        status: 'processing',
        primary_address: 1,
        secoundry_address: showshipEdit ? 1 : 0,
        add_currency: 'USD',
      }),
    );
    setOrderList(newArr2);
  };

  //*************************** */
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      userPrimAddService(id).then((e) => {
        if (e.status == 200 || e.data.primary_address[0] !== undefined) {
          props.setApiState(false);
          if (e.data.primary_address[0] !== undefined) {
            setPrimarystate(true);
            setprimaryAddress({
              ...primaryAddress,
              fname: e.data.primary_address[0].fname,
              email: e.data.primary_address[0].email,
              user_id: id,
              street: e.data.primary_address[0].street,
              state: e.data.primary_address[0].state,
              city: e.data.primary_address[0].city,
              zip: e.data.primary_address[0].zip,
              phone: e.data.primary_address[0].phone,
            });
          }
        } else {
          setPrimarystate(false);
        }
      });

      userSecAddService(id).then((e) => {
        if (e.status == 200 && e.data.secondary_address[0] !== undefined) {
          setSecondarystate(true);
          setsecondryAddress({
            ...secondryAddress,
            fname: e.data.secondary_address[0].fname,
            email: e.data.secondary_address[0].email,
            user_id: id,
            street: e.data.secondary_address[0].street,
            state: e.data.secondary_address[0].state,
            city: e.data.secondary_address[0].city,
            zip: e.data.secondary_address[0].zip,
            phone: e.data.secondary_address[0].phone,
          });
        } else if (e.status == 200 && e.data.secondary_address[0] == undefined) {
          setSecondarystate(false);
        }
      });
    }
    return () => {
      isActive = false;
    };
  }, []);

  //******************************************/*
  const addSuccess = () => {
    message.success('Address added successfully');
  };
  const updatedSuccess = () => {
    message.success('Address updated successfully');
  };
  //* ADDRESS UPDATE AND POST HANDLER

  const prisavePostHandler = () => {
    if (primarystate == false) {
      if (
        primaryAddress.city == '' ||
        primaryAddress.fname == '' ||
        primaryAddress.street == '' ||
        primaryAddress.email == '' ||
        primaryAddress.zip == '' ||
        primaryAddress.state == '' ||
        primaryAddress.phone == ''
      ) {
        alert('please fill the given fields');
      } else {
        userPrimPostService(primaryAddress).then((e) => {
          if (e.status == 200) {
            addSuccess();
            setaddModal(!addModal);
            setPopmodal(true);
            setTimeout(() => {
              setPopmodal(false);
            }, 2000);
          }
        });
      }
    } else {
      userPrimeAddressUpdateService(id, primaryAddress).then((e) => {
        if (e.status == 200) {
          updatedSuccess();
          setaddModal(!addModal);
          setPopmodal(true);
          setTimeout(() => {
            setPopmodal(false);
          }, 2000);
        }
      });
    }
  };

  const secsavePostHandler = () => {
    if (secondarystate == false) {
      if (
        secondryAddress.city == '' ||
        secondryAddress.fname == '' ||
        secondryAddress.street == '' ||
        secondryAddress.email == '' ||
        secondryAddress.zip == '' ||
        secondryAddress.state == '' ||
        secondryAddress.phone == ''
      ) {
        alert('please fill the given fields');
      } else {
        userSecPostService(secondryAddress).then((e) => {
          if (e.status == 200) {
            addSuccess();
            setShipModal(!shipModal);
            setPopmodal(true);
            setTimeout(() => {
              setPopmodal(false);
            }, 2000);
          }
        });
      }
    } else {
      usersecndAddressUpdateService(id, secondryAddress).then((e) => {
        if (e.status == 200) {
          updatedSuccess();
          setShipModal(!shipModal);
          setPopmodal(true);
          setTimeout(() => {
            setPopmodal(false);
          }, 2000);
        }
      });
    }
  };

  //********************* */

  const inputpreFieldHandler = (e) => {
    setprimaryAddress({
      ...primaryAddress,
      [e.target.id]: e.target.value,
    });
  };

  const inputsecFieldHandler = (e) => {
    setsecondryAddress({
      ...secondryAddress,
      [e.target.id]: e.target.value,
    });
  };

  //************************* */

  const orderConfirmHandler = () => {
    let count = 0;
    for (let x in orderList) {
      userOrderPostService(orderList[x]).then((e) => {
        count += 1;
        if ((e.status == 200) & (orderList?.length === count)) {
          setOrderState(true);
          userDeleteAllCartItems(id).then((e) => {
            return true;
          });
        } else {
          return null;
        }
      });
    }
  };
  function CustomToggle({ children, eventKey, onClick }) {
    return (
      <button
        disabled={showshipEdit && secondryAddress.email == ' ' ? true : activeKey == 1 && preview?.length == 0 ? true : false}
        className="btn-xnt"
        type="button"
        style={{ backgroundColor: 'pink' }}
        onClick={() => onClick(eventKey)}
      >
        {children}
      </button>
    );
  }

  function handleToggleClick(eventKey) {
    corderListhandler();
    setCount(count + 1);
    if (primaryAddress.email !== ' ') {
      setActiveKey(eventKey);
    } else {
      AddressPrime();
    }
  }

  const ardres = () => {
    message.info('please fill the shipping address', 3);
  };

  return (
    <>
      {orderState && (
        <div className="success_order">
          <div>
            <Result
              status="success"
              title="Successfully Purchased "
              subTitle="Order Successfully Purchased . Delivery Will Take 3-4 Days "
              extra={[
                <Button onClick={() => navigate('/dashboard')} type="primary" key="console">
                  Go To Orders
                </Button>,

                <Button onClick={() => navigate('/shop')} key="buy">
                  Buy Again
                </Button>,
              ]}
            />
          </div>
        </div>
      )}

      {popmodal && (
        <div className="address_update_popup">
          <i class="fa fa-check" aria-hidden="true"></i>

          <p>address updated successfully</p>
        </div>
      )}
      <Accordion activeKey={activeKey}>
        <Card>
          <Card.Header>
            <Row>
              <Col md={4} className="pt-2 pr-4">
                <span>1</span>
                <h5>
                  <i class="fa fa-home"></i> Address
                </h5>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <>
              <Card.Body>
                {' '}
                <div className="block">
                  <ShipAddress
                    modalState={primarystate}
                    modal1={showEdit}
                    hideModal1={hideEdit}
                    savePostHandler={prisavePostHandler}
                    fieldHandler={inputpreFieldHandler}
                    addressFields={primaryAddress}
                    buttonName={'Add Secondary Address'}
                    addType={'Billing Address'}
                  />

                  <Form.Check
                    onClick={(e) => {
                      e.target.checked ? hideshipEdit(true) : hideshipEdit(false);
                      // ? add a new notification
                      !showshipEdit && secondryAddress.email == ' ' ? ardres() : null;
                    }}
                    inline
                    label="Use a different shipping address"
                    name="group1"
                    type={'checkbox'}
                    id={`new form`}
                  />
                  {showshipEdit && (
                    <>
                      <ShipAddress
                        modalState={secondarystate}
                        modal1={shipeditMdoal}
                        hideModal1={shipHideModal}
                        savePostHandler={secsavePostHandler}
                        fieldHandler={inputsecFieldHandler}
                        addressFields={secondryAddress}
                        addType={'Shipping Address'}
                        buttonName={'Add Secondary Address'}
                      />
                    </>
                  )}
                </div>
              </Card.Body>
              <CustomToggle eventKey="1" onClick={handleToggleClick}>
                Order Preview
              </CustomToggle>
            </>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Row>
              <Col md={4} className="pt-2 pr-4">
                <span>2</span>
                <h5>
                  <i class="fa fa-shopping-cart asdasd" aria-hidden="true"></i> Order Summary
                </h5>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <>
              <Card.Body>
                {' '}
                <div className="checkOut_pg">
                  <div>
                    <div>
                      <OrderPrivew
                        setTotalAmount={props.setTotalAmount}
                        count={count}
                        setPreview={setPreview}
                        setisOrderItems={setisOrderItems}
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
              <CustomToggle eventKey="2" onClick={handleToggleClick}>
                PAYMENT METHOD
              </CustomToggle>
            </>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Row>
              <Col md={4} className="pt-2 pr-4">
                <span>3</span>
                <h5>
                  <i class="fa fa-credit-card" aria-hidden="true"></i> Payment Options
                </h5>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <>
              <Card.Body>
                <PaymentMethod
                  showshipEdit={showshipEdit}
                  primaryAddress={primaryAddress}
                  secondryAddress={secondryAddress}
                  payingAmmount={props.totalAmount}
                  confirmPaymnet={orderConfirmHandler}
                  setpaymnetData={setpaymnetData}
                />
              </Card.Body>
            </>
          </Accordion.Collapse>
        </Card>
        {/* Merchandising END*/}
      </Accordion>
    </>
  );
};

export default CheckTest;
