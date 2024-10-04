import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'antd/dist/antd.css';
import Alert from 'react-bootstrap/Alert';
import { Breadcrumb, message } from 'antd';
import { HOME } from '../../constants/route-path-constant';
import { userForgotPasswordService } from '../../services/apiServices/apiService';

function Signup() {
  const [data, setData] = useState({
    email: null,
  });
  const [verified, setVerified] = useState(false);
  const [notReg, setNotReg] = useState(false);
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

  const submitHandler = (e) => {
    e.preventDefault();
    verified ? setVerified(false) : null;
    if (data.email == null || !data.email.includes('@')) {
      setPopUp({
        show: true,
        message: 'please check or enter a valid email Address',
        variant: 'primary',
      });
      document.getElementById('email').value = '';
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
      setData({
        email: '',
      });
    } else {
      userForgotPasswordService(data.email).then((e) => {
        if (e.data.status == 200) {
          setVerified(true);
          setNotReg(false);
        } else if (e.data.status == 201) {
          setNotReg(true);
          setVerified(false);
        }
      });
    }
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
              <h1>Forget Password</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>forget password</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <div className="mainAbout">
        <Container>
          <Row>
            <Col md={8}>
              <h2 className="mb-4"> Forget Password</h2>
              <p>
                Already have an account?
                <Link className="acc" to="/login">
                  Login
                </Link>
              </p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>email *</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setDataHandler(e);
                    }}
                    type="text"
                    id="email"
                    placeholder="Enter your registered email"
                  />
                </Form.Group>
                {verified && <p style={{ color: 'green' }}>Otp and verification link successfully sent to your email</p>}
                {notReg && (
                  <p style={{ color: 'red' }}>
                    This email id is not registered with us. Kindly enter a registered email or sign up now.
                  </p>
                )}

                <Button id="submit" type="submit" onClick={(e) => submitHandler(e)} className="btn-submit">
                  <i class="fa fa-play"></i> &nbsp; {!verified ? 'submit' : 'resend'}
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
