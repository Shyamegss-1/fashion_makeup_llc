import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { IMG_PATH } from '../constants/path-constants';

function SliderSweeperComponent({ data }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((e) => {
          return (
            <SwiperSlide key={e.id}>
              <div className="slider-content">
                <p className="small-tag">{e.season}</p>
                <h1>{e.title}</h1>
                <h4>{e.content}</h4>
              </div>
              <img className="front_image" alt="Pro Image" src={IMG_PATH + e.image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default SliderSweeperComponent;
