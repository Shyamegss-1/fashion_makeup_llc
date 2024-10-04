import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import ChangePassword from './changePassword';
import UpdateAddress from './address';
import {
  userPrimAddService,
  userPrimeAddressUpdateService,
  userPrimPostService,
  userSecAddService,
  usersecndAddressUpdateService,
  userSecPostService,
} from '../../../services/apiServices/apiService';
import OrderList from './orderlist';
import { Card } from 'antd';
import { Tooltip } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Tabs, message } from 'antd';
import PageLoader from '../../../layout/loader-page';

const Dashboard = (props) => {
  const { email, username, id } = useSelector((e) => e.userLogin.userDetail);
  const [modal, setmodal] = useState(false);
  const [popmodal, setPopmodal] = useState(2);
  const [pdwModal, setpModal] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [apiState, setApiState] = useState(true);
  const [shipModal, setShipModal] = useState(false);
  const [primarystate, setPrimarystate] = useState(false);
  const [secondarystate, setSecondarystate] = useState(false);
  const [primaryAddress, setprimaryAddress] = useState({
    fname: '',
    email: '',
    user_id: id,
    street: '',
    state: '',
    city: '',
    zip: '',
    phone: ' ',
  });
  const [secondryAddress, setsecondryAddress] = useState({
    fname: '',
    email: '',
    user_id: id,
    street: '',
    state: '',
    city: '',
    zip: '',
    phone: '',
  });

  const success = () => {
    message.loading('Address update progress..', popmodal).then(() => message.success('Updated successfully..', popmodal));
  };

  useEffect(() => {
    userPrimAddService(id).then((e) => {
      if (e.status == 200 && e.data.primary_address[0] !== undefined) {
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
  }, []);

  function setpdwModal() {
    setpModal(!pdwModal);
  }
  function setardModal() {
    if (confirm('Are you sure you want leave without save')) {
      setaddModal(!addModal);
    } else {
      return;
    }
  }

  function setsipModal() {
    if (confirm('Are you sure you want leave without save')) {
      setShipModal(!shipModal);
    } else {
      return;
    }
  }
  function clavlsModal() {
    setmodal(!modal);
  }
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

  const adresPostHandler = () => {
    setShipModal(!shipModal);
  };
  const adreprPostHandler = () => {
    setaddModal(!addModal);
  };

  //* ADDRESS UPDATE AND POST HANDLER

  const prisavePostHandler = () => {
    success();
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
            setaddModal(!addModal);
          } else if (e.status !== 200) {
            setPopmodal(0.1);
          }
        });
      }
    } else {
      userPrimeAddressUpdateService(id, primaryAddress).then((e) => {
        if (e.status == 200) {
          setaddModal(!addModal);
        } else if (e.status !== 200) {
          setPopmodal(0.1);
        }
      });
    }
  };

  const secsavePostHandler = () => {
    success();
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
            setShipModal(!shipModal);
          } else if (e.status !== 200) {
            setPopmodal(0.1);
          }
        });
      }
    } else {
      usersecndAddressUpdateService(id, secondryAddress).then((e) => {
        if (e.status == 200) {
          setShipModal(!shipModal);
        } else if (e.status !== 200) {
          setPopmodal(0.1);
        }
      });
    }
  };

  return (
    <>
      <div className="ctn-dashboard">
        <div className="w-user">
          <h2>Hello, {username}!</h2>
          <p>
            From your My Account Dashboard you have the ability to view a snapshot of your recent account activity and update
            your account information. Select a link below to view or edit information.
          </p>
        </div>
        <div className="user-order-detail">
          <div className="uo-list">
            <h3>Recent Orders</h3>
          </div>
          <Table variant="light">
            <OrderList setApiState={props.setApiState} primeAdres={primaryAddress} secAdrs={secondryAddress} />
            {/* <div id="nO-yt">No orders... </div> */}
          </Table>
        </div>
        {/* <ChangePassword  */}
        {pdwModal && (
          <div className="pwd_continer">
            <ChangePassword setpdwModal={setpdwModal} />
          </div>
        )}

        {addModal && (
          <UpdateAddress
            setardModal={setardModal}
            savePostHandler={prisavePostHandler}
            fieldHandler={inputpreFieldHandler}
            addressFields={primaryAddress}
            type={'invoice address'}
          />
        )}
        {shipModal && (
          <UpdateAddress
            savePostHandler={secsavePostHandler}
            setardModal={setsipModal}
            fieldHandler={inputsecFieldHandler}
            addressFields={secondryAddress}
            type={'shipping address'}
          />
        )}
      </div>
      <Tabs defaultActiveKey="1" size="large" tabPosition={'left'} style={{ marginTop: '60px' }}>
        <Tabs.TabPane
          key={1}
          tab={
            <span>
              <UserOutlined /> Account Details
            </span>
          }
        >
          <div className="w-detail-edit">
            <div className="w-d-left">
              <div className="user-cont-info">
                <h4>Account Information</h4>
                <div>
                  <p>{username}</p>
                  <p>{email}</p>
                  <p onClick={() => setpModal(true)}>
                    <Link className="links_styleing" to={'#'}>
                      change password
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          key={2}
          tab={
            <span>
              <HomeOutlined /> Address
            </span>
          }
        >
          <div className="bL-sI-add">
            <div className="bL-sI-left">
              {primarystate ? (
                <div className="site-card-border-less-wrapper">
                  <Card
                    size="large"
                    title="Billing Address"
                    extra={
                      <p onClick={() => setaddModal(true)}>
                        <Link className="links_styleing" to={'#'}>
                          <Tooltip title="Edit Address">
                            <SettingOutlined style={{ fontSize: '17px', color: '#1890ff' }} />
                          </Tooltip>
                        </Link>
                      </p>
                    }
                    style={{
                      width: 400,
                    }}
                  >
                    <p>
                      <span>Name</span> : {primaryAddress.fname}
                    </p>
                    <p>
                      <span>Email</span> : {primaryAddress.email}
                    </p>
                    <p>
                      <span>Phone</span> : {primaryAddress.phone}
                    </p>
                    <p>
                      <span>Street</span> : {primaryAddress.street}
                    </p>
                    <p>
                      <span>City</span> : {primaryAddress.city}
                    </p>
                    <p>
                      <span>state</span> : {primaryAddress.state}
                    </p>
                    <p>
                      <span>Zip code</span> : {primaryAddress.zip}
                    </p>
                  </Card>
                </div>
              ) : (
                <button onClick={() => adreprPostHandler()} className="btn-next edit-btn adddr">
                  Add primary Address
                </button>
              )}
            </div>
            <div className="bL-sI-right">
              {secondarystate ? (
                <div className="site-card-border-less-wrapper">
                  <Card
                    size="large"
                    title="Shipping Address"
                    extra={
                      <p onClick={() => setShipModal(true)}>
                        <Link className="links_styleing" to={'#'}>
                          <Tooltip title="Edit Address">
                            <SettingOutlined style={{ fontSize: '17px', color: '#1890ff' }} />
                          </Tooltip>
                        </Link>
                      </p>
                    }
                    style={{
                      width: 400,
                    }}
                  >
                    <p>
                      <span>Name</span> : {secondryAddress.fname}
                    </p>
                    <p>
                      <span>Email</span> : {secondryAddress.email}
                    </p>
                    <p>
                      <span>Phone</span> : {secondryAddress.phone}
                    </p>
                    <p>
                      <span>Street</span> : {secondryAddress.street}
                    </p>
                    <p>
                      <span>City</span> : {secondryAddress.city}
                    </p>
                    <p>
                      <span>state</span> : {secondryAddress.state}
                    </p>
                    <p>
                      <span>Zip code</span> : {secondryAddress.zip}
                    </p>
                  </Card>
                </div>
              ) : (
                <button onClick={() => adresPostHandler()} className="btn-next edit-btn adddr">
                  Add Secondary Address
                </button>
              )}
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};
export default Dashboard;
