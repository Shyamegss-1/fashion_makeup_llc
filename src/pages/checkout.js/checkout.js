import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import CheckOutSteps from './checkout-steps';
import BillingInfo from './billing-info';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HOME } from '../../constants/route-path-constant';
import PageLoader from '../../layout/loader-page';
const Usercheckout = () => {
  const [apiState, setApiState] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  return (
    <>
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>CheckOut</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Component</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      {apiState && <PageLoader />}
      <div className="mainAbout">
        <Container>
          <Row>
            <Col lg={9} md={12}>
              <CheckOutSteps totalAmount={totalAmount} setTotalAmount={setTotalAmount} setApiState={setApiState} />
            </Col>

            <Col lg={3} md={12}>
              <BillingInfo totalAmount={totalAmount} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Usercheckout;
