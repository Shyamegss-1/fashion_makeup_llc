import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { productRegisterUser } from '../../services/apiServices/apiService';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';
import { HOME } from '../../constants/route-path-constant';

function Signup() {
  const navigate = useNavigate();
  const [p1, setp1] = useState(false);
  const [p2, setp2] = useState(false);

  const [Popup, setPopUp] = useState({
    show: false,
    message: 'please please check or enter a valid email Address',
    variant: 'success',
  });
  const [data, setData] = useState({
    userName: null,
    password: null,
    email: null,
    confirmPassword: null,
  });

  const setDataHandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.userName == null) {
      document.getElementById('userName').value = '';
      setPopUp({
        show: true,
        message: 'please enter a user name',
        variant: 'primary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.email == null || !data.email.includes('@') || !data.email.includes('.')) {
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
    } else if (data.confirmPassword == null || data.password !== data.confirmPassword) {
      setPopUp({
        show: true,
        message: 'please enter or check your confirm password',
        variant: 'secondary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.userName !== null && data.confirmPassword !== null && data.email !== null) {
      let object = {
        username: data.userName,
        password: data.password,
        email: data.email,
      };
      try {
        productRegisterUser(object).then((e) => {
          if (e.status == 200 && e.data.message == 'User Registation Successfully!') {
            setPopUp({
              show: true,
              message: e.data.message,
              variant: 'success',
            });

            setTimeout(() => {
              setPopUp({ ...data, show: false });
              navigate('/login');
            }, 1500);

            setData({ email: null, userName: null, password: null, confirmPassword: null });
            document.getElementById('userName').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';
          } else if (e.data.message == 'Email already registered') {
            setPopUp({
              show: true,
              message: e.data.message,
              variant: 'danger',
            });
            setTimeout(() => {
              setPopUp({ ...data, show: false });
            }, 2000);
            document.getElementById('email').value = '';
            setData({ ...data, email: null });
          }
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const togglePassword1 = () => {
    setp1(!p1);
  };
  const togglePassword2 = () => {
    setp2(!p2);
  };

  return (
    <>
      {Popup.show && (
        <div className="popup-info-Alert">
          <Alert variant={Popup.variant}>{Popup.message}</Alert>
        </div>
      )}
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Create an Account</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create an Account</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <div className="mainAbout">
        <Container>
          <Row>
            <Col md={8}>
              <h2 className="mb-4"> Create an Account</h2>
              <p>
                Already have an account?
                <Link className="acc" to="/login">
                  Login
                </Link>{' '}
                or{' '}
                <Link className="acc" to="/forgotpassword">
                  Forget Password
                </Link>
              </p>
              <Form onSubmit={(e) => submitHandler(e)}>
                <Form.Group className="mb-3">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setDataHandler(e);
                    }}
                    type="text"
                    id="userName"
                    placeholder=" Enter a username."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => {
                      setDataHandler(e);
                    }}
                    id="email"
                    placeholder="please enter your email"
                  />
                </Form.Group>

                <Form.Group className="mb-3 eyemarker">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type={p1 ? 'text' : 'password'}
                    onChange={(e) => {
                      setDataHandler(e);
                    }}
                    id="password"
                    placeholder="please enter password"
                  />
                  <span
                    toggle="#password-field"
                    onClick={() => togglePassword1()}
                    class="fa fa-fw fa-eye field-icon toggle-password"
                  ></span>
                </Form.Group>

                <Form.Group className="mb-3 eyemarker">
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control
                    type={p2 ? 'text' : 'password'}
                    onChange={(e) => {
                      setDataHandler(e);
                    }}
                    id="confirmPassword"
                    placeholder="confirm password"
                  />
                  <span
                    toggle="#password-field"
                    onClick={() => togglePassword2()}
                    class="fa fa-fw fa-eye field-icon toggle-password"
                  ></span>
                </Form.Group>

                <Button id="submit" type="submit" className="btn-submit">
                  <i class="fa fa-play"></i> &nbsp; CREATE ACCOUNT
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Signup;
