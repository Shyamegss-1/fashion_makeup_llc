import React, { useContext, useEffect, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { PRODUCT_DISCRIPTION } from '../../../constants/route-path-constant';
import { IMG_PATH } from '../../../constants/path-constants';
import HelmetMeta from '../../../services/meta-helmet.js';
import BottomPopUP from '../../../layout/bottomPopups';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import 'antd/dist/antd.css';
import { currencyExchangeService } from '../../../services/apiServices/apiService';
import { CurrencyAmount } from '../../../context/currencyContext';

function Products(props) {
  const dispatch = useDispatch();
  const { token } = useSelector((e) => e.userLogin.userDetail);
  const [loginState, setloginState] = useState(false);
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);
  const success = () => {
    message.success({
      content: 'Item Added successfully',
      duration: 4,
    });
  };

  const addButtonHandler = () => {
    setloginState(true);
    setTimeout(() => {
      setloginState(false);
    }, 1500);
  };

  const cartHandler = (id, title, price, image) => {
    success();
    dispatch({ type: 'ADD_ITEM', payload: { id: id, title: title, price: price, image: image } });
  };

  return (
    <>
      <Swiper
        breakpoints={{
          0: {
            width: 0,
            slidesPerView: 1,
          },
          576: {
            width: 576,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1024: {
            width: 1024,
            slidesPerView: 3,
          },
          1200: {
            width: 1200,
            slidesPerView: 3,
          },
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={4}
        navigation={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {props.Products.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <HelmetMeta
                title={item.meta_title.replaceAll(' ', '-')}
                keyword={item.meta_keyword.replaceAll(' ', '-')}
                discription={item.meta_description.replaceAll(' ', '-')}
              />
              <li key={item.id} className="item col-lg-12 max-for-this col-md-12 col-sm-12 col-xs-12">
                <div className="item-inner">
                  <div className="productborder">
                    <div className="item-img">
                      <div className="item-img-info">
                        {' '}
                        <Link
                          className="product_image image-wrapper"
                          to={PRODUCT_DISCRIPTION(item.name.replaceAll(' ', '-'), item.id)}
                        >
                          {' '}
                          <img className="front_image" alt="Pro Image" src={IMG_PATH + item.image} />{' '}
                        </Link>
                        <div className="item-box-hover">
                          <div className="box-inner">
                            <div className="add_cart">
                              <button
                                onClick={
                                  token
                                    ? () => props.additem(item.id)
                                    : () => cartHandler(item.id, item.name, item.price, item.image)
                                }
                                className="button btn-cart"
                                type="button"
                              >
                                <span>Add to Cart</span>
                              </button>
                            </div>
                            <div className="product-detail-bnt">
                              <Link
                                to={PRODUCT_DISCRIPTION(item.name.replaceAll(' ', '-'), item.id)}
                                className="button detail-bnt"
                              >
                                <span>Quick View</span>
                              </Link>
                            </div>
                            <div className="actions">
                              <span className="add-to-links">
                                <Link
                                  onClick={token ? () => props.selectItem(item.id) : addButtonHandler}
                                  to={'#'}
                                  className="link-wishlist"
                                  title="Add to Wishlist"
                                >
                                  <span>Add to Wishlist</span>
                                </Link>{' '}
                              </span>{' '}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="right-block">
                      <div className="item-info">
                        <div className="info-inner">
                          <div className="item-title">
                            {' '}
                            <Link
                              title="Bluetooth Smart Watch"
                              to={PRODUCT_DISCRIPTION(item.name.replaceAll(' ', '-'), item.id)}
                            >
                              {item.name?.length > 41 ? item.name.slice(0, 41) + '...' : item.name}
                            </Link>
                            <h5>{item.category_id}</h5>
                          </div>
                          <div className="item-price">
                            <div className="price-box">
                              {' '}
                              <span className="regular-price">
                                {' '}
                                <span className="price">
                                  {Currency}{' '}
                                  {Currency == 'SAR'
                                    ? Math.ceil(item.price * saRates).toFixed(2)
                                    : Currency == 'AED'
                                    ? Math.ceil(item.price * aedRates).toFixed(2)
                                    : Currency == 'QAR'
                                    ? Math.ceil(item.price * qarRate).toFixed(2)
                                    : item.price}
                                </span>{' '}
                              </span>{' '}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {loginState && (
        <div className="bottom_popup">
          <BottomPopUP status={201} message={'Login first !!'} />
        </div>
      )}
    </>
  );
}

export default Products;
