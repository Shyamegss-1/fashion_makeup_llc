import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import headIcon from '../../images/about/beauty-icon1.png';
import { Link } from 'react-router-dom';
import Dashboard from './components/dashboard';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';
import { HOME } from '../../constants/route-path-constant';
import PageLoader from '../../layout/loader-page';
const UserDetail = () => {
  const [apiState, setApiState] = useState(true);
  return (
    <>
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>User Dashboard</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <div className="mainAbout">
        {apiState && <PageLoader />}
        <Container>
          <Row>
            <Col md={12}>
              <Dashboard setApiState={setApiState} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default UserDetail;
