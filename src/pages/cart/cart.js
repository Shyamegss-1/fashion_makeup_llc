import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/contact/contact-banner.jpg';
import Checkout from './checkout';
import PageLoader from '../../layout/loader-page';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import { HOME } from '../../constants/route-path-constant';

const Cart = () => {
  const [apiState, setApiState] = useState(true);
  return (
    <>
      {apiState && <PageLoader />}
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Shopping Cart</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>cart</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      <Container>
        <Checkout setApiState={setApiState} />
      </Container>
    </>
  );
};
export default Cart;
