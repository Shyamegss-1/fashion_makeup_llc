import productTwo from '../../../../images/product/Moisturizing-Hair-Treatment.jpg';
import productThree from '../../../../images/product/Vitamin-C-Intensive-Face-Cream.jpg';
import productFour from '../../../../images/product/Skin-Plumping-Serum.jpg';
import { IMG_PATH } from '../../../../constants/path-constants';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselElement, MDBContainer } from 'mdb-react-ui-kit';
import { Col } from 'react-bootstrap';

import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useRef,useCallback } from 'react';

function Slider(props) {
  const [items, setItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselInner = useRef(null);


  const slideChanged = useCallback(() => {
    const activeItem = carouselInner.current.querySelector('.active');
    setCurrentSlide(Array.from(carouselInner.current.children).indexOf(activeItem));
  }, []);

  const changeSlide = useCallback(
    (position) => {
      Array.from(carouselInner.current.children).forEach((el, i) => {
        if (i !== position) {
          el.classList.remove('active');
        } else {
          el.classList.add('active');
          slideChanged();
        }
      });
    },
    [[]],
  );

  return (
    <>
      <Col lg={6} md={12} className="mt-4 mb-5">
        <MDBContainer>
          <MDBCarousel id="carouselExampleIndicators" showControls fade onSlide={slideChanged}>
            <MDBCarouselInner ref={carouselInner}>
              <MDBCarouselItem className="active">
                <MDBCarouselElement src={IMG_PATH + props.image} alt="..." />
              </MDBCarouselItem>

              <MDBCarouselItem>
                <MDBCarouselElement src={productTwo} alt="..." />
              </MDBCarouselItem>

              <MDBCarouselItem>
                <MDBCarouselElement src={productThree} alt="..." />
              </MDBCarouselItem>
              <MDBCarouselItem>
                <MDBCarouselElement src={productFour} alt="..." />
              </MDBCarouselItem>
            </MDBCarouselInner>

            <div className="carousel-indicators" style={{ marginBottom: '-20px' }}>
              <button
                className={`carousel-indicator ${currentSlide === 0 ? 'active' : ''}`}
                onClick={() => changeSlide(0)}
                style={{
                  width: '100px',
                  border: '1px solid rgb(188 185 185)',
                }}
              >
                <img className="d-block w-100 img-fluid" src={ IMG_PATH + props.image } />
              </button>
              <button
                className={`carousel-indicator ${currentSlide === 1 ? 'active' : ''}`}
                onClick={() => changeSlide(1)}
                style={{
                  width: '100px',
                  border: '1px solid rgb(188 185 185)',
                }}
              >
                <img className="d-block w-100 img-fluid" src={productTwo} />
              </button>
              <button
                className={`carousel-indicator ${currentSlide === 2 ? 'active' : ''}`}
                onClick={() => changeSlide(2)}
                style={{
                  width: '100px',
                  border: '1px solid rgb(188 185 185)',
                }}
              >
                <img className="d-block w-100 img-fluid" src={productThree} />
              </button>
              <button
                className={`carousel-indicator ${currentSlide === 3 ? 'active' : ''}`}
                onClick={() => changeSlide(3)}
                style={{
                  width: '100px',
                  border: '1px solid rgb(188 185 185)',
                }}
              >
                <img className="d-block w-100 img-fluid" src={productFour} />
              </button>
            </div>
          </MDBCarousel>
        </MDBContainer>
      </Col>
    </>
  );
}

export default Slider;
