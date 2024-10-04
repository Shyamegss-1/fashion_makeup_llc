import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../../shop.css';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import { HOME } from '../../constants/route-path-constant';
import NewPage from './newPage';

function Shop() {
  return (
    <>
      <div
        className="breadCumbHead"
        style={{ backgroundImage: `url(${'http://themesground.com/covmed/demo/V3/images/header-inner-bg.jpg'})` }}
      >
        <Container>
          <Row>
            <Col>
              <h1>Shop</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <NewPage />
    </>
  );
}

export default Shop;
