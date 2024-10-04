import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const HomeProducts = (props) => {
  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        {props.Categories.map((list) => {
          return (
            <Col md={4} className="cartitemmain">
              <div className="catItem">
                <img src={list.image} />
                <div className="catInner">
                  <div className="catInnerContent">
                    <h3 className="catTittle">{list.catName}</h3>
                    <Link to="#" className="catLink">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default HomeProducts;
