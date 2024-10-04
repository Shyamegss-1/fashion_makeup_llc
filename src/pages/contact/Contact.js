import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import pageHeaderImg from '../../images/contact/contact-banner.jpg';
import headIcon from '../../images/about/beauty-icon1.png';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import { productContactUsService } from '../../services/apiServices/apiService';
import Alert from 'react-bootstrap/Alert';
import PageLoader from '../../layout/loader-page';
import { ABOUT_US, SHOP, DASHBOARD, HOME } from '../../constants/route-path-constant';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';

function Contact() {
  const [apiState, setApiState] = useState(false);
  const [Popup, setPopUp] = useState({
    show: false,
    message: 'popup message shown here',
    variant: 'success',
  });
  const [data, setData] = useState({
    name: null,
    email: null,
    phoneNo: null,
    message: null,
  });

  const datahandler = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.name == null) {
      setPopUp({
        show: true,
        message: 'please enter your  name',
        variant: 'primary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
      document.getElementById('userName').value = '';
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
    } else if (data.phoneNo == null || data.phoneNo.length < 10) {
      setPopUp({
        show: true,
        message: 'please enter your mobile no',
        variant: 'secondary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.message == null) {
      setPopUp({
        show: true,
        message: 'please enter message',
        variant: 'secondary',
      });

      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else {
      setApiState(true);
      let options = {
        name: data.name,
        email: data.email,
        phone: data.phoneNo,
        message: data.message,
      };
      productContactUsService(options).then((e) => {
        if (e.status == 200) {
          setApiState(false);
          setPopUp({
            show: true,
            message: 'Thanks for contacting us! Our team will get back to you shortly!',
            variant: 'success',
          });
          setTimeout(() => {
            setPopUp({ ...data, show: false });
          }, 2000);
          setData({ email: null, name: null, phoneNo: null, message: null });
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('phoneNo').value = '';
          document.getElementById('message').value = '';
        } else if (e.status !== 200) {
          setApiState(false);
          if (e.status == 200) {
            setPopUp({
              show: true,
              message: 'failed to send data please try again',
              variant: 'danger',
            });
            setTimeout(() => {
              setPopUp({ ...data, show: false });
            }, 2000);
          }
        }
      });
    }
  };

  return (
    <>
      {apiState && <PageLoader />}
      {Popup.show && (
        <div className="popup-info-Alert">
          <Alert variant={Popup.variant}>{Popup.message}</Alert>
        </div>
      )}
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Contact Us</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>contact us</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <div className="mainAbout">
        <Container>
          <Row>
            <Col md={9}>
              <div className="contact_main_head">
                <h1>HAVE A QUESTION?</h1>
                <p>
                  We’re here to help! Feel free to give us a call by dialing &nbsp;
                  <span>
                    <a href="tel:+16237558567"> +1 623 755-8567</a>
                  </span>{' '}
                  during our business hours or email us at{' '}
                  <span onClick={() => (window.location = 'mailto:sales@fashionandmakeupusa.com')}>
                    sales@fashionandmakeupusa.com
                  </span>
                </p>
                <h1>SEND US AN INQUIRY</h1>
                <p>
                  Reach Fashion and Makeup LLC if you have queries about our services or products. Feel free to email or call us
                  during working hours or leave us a message and we will reach you at the earliest. Share your contact details
                  below.
                </p>
              </div>
              <div className="contact_form">
                <Form onSubmit={(e) => submitHandler(e)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name *</Form.Label>
                    <Form.Control type="text" id="name" onChange={(e) => datahandler(e)} placeholder="enter your name" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" id="email" onChange={(e) => datahandler(e)} placeholder="enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone *</Form.Label>
                    <Form.Control
                      type="number"
                      id="phoneNo"
                      onChange={(e) => datahandler(e)}
                      placeholder="enter your phone no"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message*</Form.Label>
                    <Form.Control as="textarea" id="message" onChange={(e) => datahandler(e)} rows={3} />
                  </Form.Group>

                  <button type={'submit'} className="btn-next">
                    submit
                  </button>
                </Form>
              </div>
            </Col>
            <Col md={3}>
              <div className="abSidebar">
                <h3 style={{ backgroundImage: `url(${headIcon})` }}>Company</h3>
                <ul className="sileList">
                  <li>
                    <Link to={ABOUT_US}>About Us</Link>
                  </li>
                  <li>
                    <Link to={SHOP}>Shop</Link>
                  </li>
                  <li>
                    <Link to={DASHBOARD}>Dashboard</Link>
                  </li>
                  <li>
                    <Link to="#">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Contact;
