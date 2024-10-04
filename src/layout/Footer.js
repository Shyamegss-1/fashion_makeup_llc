import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../images/logo/logo.png';
import { CONTACT, BLOGS, ABOUT_US, DASHBOARD } from '../constants/route-path-constant';

function Footer() {
  return (
    <>
      <div className="footer">
        <Container>
          <Row>
            <Col lg={8} md={12}>
              <div className="footerTop">
                <ul className="addresSsec">
                  <li>
                    <span className="icon-pins">
                      <i className="fa fa-map"></i>
                    </span>{' '}
                    <div>
                      <p>FASHION & MAKEUP LIMITED LIABILITY COMPANY</p>
                      {/* <h6 style={{ marginBottom: '0' }}>3104 E Camelback Rd #2868 </h6>
                      <h6>Phoenix, AZ 85016</h6>
                      <p onClick={() => (window.location = 'mailto:sales@fashionandmakeupusa.com')}>
                        sales@fashionandmakeupusa.com
                      </p> */}
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={6} md={12}></Col>
          </Row>
        </Container>
        <div className="footerBottom">
          <Container>
            <Row className="justify-content-start">
              <Col lg={5} md={6}>
                <div className="navBrand">
                  <div className="f-logo">
                    <img className="f-brand-logo" src={logo} />
                  </div>

                  <p>
                    We are one of the leading names in the skin treatment and beauty industry, delivering premium quality
                    skincare, eyecare, haircare, and cosmetic products. At Fashion and Makeup LLC, we bring a wide variety of
                    skincare essentials, cosmetics, and makeup products at pocket-friendly prices.
                  </p>
                </div>
              </Col>
              <Col lg={3} md={6}>
                <h3>Quick Links</h3>
                <ul className="f-list">
                  <li>
                    <Link to={BLOGS} className="f-link">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to={DASHBOARD} className="f-link">
                      Your Account
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="f-link">
                      Orders History
                    </Link>
                  </li>
                  <li>
                    <Link to={ABOUT_US} className="f-link">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to={CONTACT} className="f-link">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col lg={4} md={6}>
                <h3>Address</h3>
                <ul className="f-list">
                  <li>
                    <h6 style={{ marginBottom: '0' }}>3104 E Camelback Rd #2868 </h6>
                    <h6>Phoenix, AZ 85016</h6>
                  </li>

                  <li>
                    <p onClick={() => (window.location = 'mailto:sales@fashionandmakeupusa.com')}>
                      sales@fashionandmakeupusa.com
                    </p>
                    <p>
                      <a href="tel:+16237558567">+1 623 755-8567</a>
                    </p>
                  </li>
                </ul>

                <div className="footerTop">
                  <ul className="sociaList" style={{ padding: 0 }}>
                    <li>
                      <Link to="#" className="icon-pins">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="icon-pins">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="icon-pins">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>

                    <li>
                      <Link to="#" className="icon-pins">
                        <i className="fa fa-envelope"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Footer;

// const Callto = ({ phone, children }) => {
//   return (

//   );
// };
