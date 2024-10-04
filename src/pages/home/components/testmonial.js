import React, { useState, useEffect } from 'react';
import { productTestmonialService } from '../../../services/apiServices/apiService';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ComponentTestmonial = () => {


    const [data,setData] = useState([])
  useEffect(() => {
    productTestmonialService().then((e) => {
      if (e.status == 200) {
        
        setData(e.data.testimonial);
      }
    });
  }, []);

  return (
    <>
      <Row className="g-0">
        <Col xl={9} lg={12}>
          <div className="testSlider">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {data.map((list) => {
                return (
                  <SwiperSlide key={list.id}>
                    <div className="testiItem">
                      <Row className="align-items-center">
                        <Col xl={5} lg={12}>
                          <div className="testiThumb">
                            <img src={list.image} />
                          </div>
                        </Col>
                        <Col xl={7} lg={12} className="text-center">
                          <div className="testContent">
                            <p>{list.description}</p>
                            <h5>{list.name}</h5>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ComponentTestmonial;
