import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import headIcon from '../../images/about/beauty-icon1.png';
import { Link } from 'react-router-dom';
import WishlsitItems from './list-items';
import PageLoader from '../../layout/loader-page';

const Wishlist = () => {
  const [apiState, setApiState] = useState(true);

  const clsModal = () => {
    setApiState(false);
  };
  const clsModals = () => {
    setApiState(!apiState);
  };

  return (
    <>
      {apiState && <PageLoader />}
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Wish List</h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mainAbout">
        <Container>
          <Row>
            <Col lg={10} md={12}>
              <WishlsitItems clsModal={clsModal} clsModals={clsModals} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Wishlist;
