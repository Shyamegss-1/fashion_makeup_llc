import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';
import { HOME } from '../../constants/route-path-constant';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [p1, setp1] = useState(false);
  const { userDetail, messageState, token, loader } = useSelector((e) => e.userLogin);
  const [data, setData] = useState({
    password: null,
    email: null,
  });
  let lastPageUrl = document.referrer;
  const [Popup, setPopUp] = useState({
    show: false,
    message: 'please please check or enter a valid email Address',
    variant: null,
  });

  const setDataHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      if (token !== null) {
        navigate('/dashboard');
      }
    }, 900);
  });

  const loginHandler = (e) => {
    e.preventDefault();

    if (data.email == null || !data.email.includes('@') || !data.email.includes('.')) {
      setPopUp({
        show: true,
        message: 'please check or enter a valid email Address',
        variant: 'primary',
      });
      document.getElementById('email').value = '';
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.password == null) {
      setPopUp({
        show: true,
        message: 'enter your password',
        variant: 'secondary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.password !== null && data.email !== null) {
      let options = {
        email: data.email,
        password: data.password,
      };
      dispatch({ type: 'LOADING_STATE' });
      dispatch({ type: 'LOGIN_REQUESTED', payload: options });
      setData({ email: null, password: null });
    }
  };

  const togglePassword1 = () => {
    setp1(!p1);
  };

  return (
    <>
      {Popup.show && (
        <div className="popup-info-Alert">
          <Alert variant={Popup.variant}>{Popup.message}</Alert>
        </div>
      )}
      {messageState && (
        <div className="popup-info-Alert">
          <Alert variant={!token ? 'danger' : 'success'}>{userDetail.message}</Alert>
        </div>
      )}
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Login or Create an Account</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>login</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <div className="mainAbout">
        <Container>
          <Row>
            <Col md={6}>
              <h3 className="login-title">New Customers</h3>

              <p className="mt-3">
                By creating an account with our store, you will be able to move through the checkout process faster, store
                multiple shipping addresses, view and track your orders in your account and more.
              </p>
              <Link to="/Signup">
                <Button variant="" type="submit" className="btn-signup">
                  Create an account
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              {loader ? (
                <div className="card" aria-hidden="true">
                  <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                      <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                      <span style={{ padding: '26px' }} className="placeholder row-5 col-12"></span>
                    </p>
                    <p className="card-text placeholder-glow">
                      <span className="placeholder col-1"></span>
                      <span className="placeholder col-7"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-4"></span>
                      <span className="placeholder col-6"></span>
                      <span className="placeholder col-8"></span>
                    </p>
                    <a href="#" tabindex="-1" className="btn btn-primary disabled placeholder col-6"></a>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="login-title"> Registered Customers</h3>
                  <p>If you have an account with us, please log in.</p>
                  <Form onSubmit={(e) => loginHandler(e)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setDataHandler(e);
                        }}
                        type="email"
                        placeholder="Enter Your Email"
                        id="email"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 eyemarker">
                      <Form.Label>Password *</Form.Label>
                      <Form.Control
                        onChange={(e) => {
                          setDataHandler(e);
                        }}
                        type={p1 ? 'text' : 'password'}
                        id="password"
                        placeholder="Enter Password"
                      />
                      <span
                        style={{ right: '120px !important' }}
                        toggle="#password-field"
                        onClick={() => togglePassword1()}
                        class="fa fa-fw fa-eye fields-icon toggle-password"
                      ></span>
                    </Form.Group>

                    <Button type="submit" className="btn-submit">
                      <i className="fa fa-play"></i> &nbsp; Login
                    </Button>
                    <Link to="/forgotpassword" className="forgot-password">
                      Forget Password?
                    </Link>
                  </Form>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Login;
