import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
// Import Swiper styles

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import cartImgOne from '../../images/home/cartImg1.jpg';
import cartImgTwo from '../../images/home/cartImg2.jpg';
import cartImgThree from '../../images/home/cartImg3.jpg';

import HomeProducts from './components/homeCategories';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import Products from './components/product';
import NewArrival from './components/newArrival';
import {
  productBannerService,
  productCartListPostService,
  productChooseService,
  productWishListPostService,
} from '../../services/apiServices/apiService';
import { IMG_PATH } from '../../constants/path-constants';
import ComponentTestmonial from './components/testmonial';
import { productBlogsService, productListService } from '../../services/apiServices/apiService';
import PageLoader from '../../layout/loader-page';
import { SHOP, BLOG_DETAIL } from '../../constants/route-path-constant';
import BottomPopUP from '../../layout/bottomPopups';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';

const Home = () => {
  const { token, id, email, username } = useSelector((e) => e.userLogin.userDetail);

  //! INTERCOM SERVICE

  let emailid = email;
  let name = username;
  if (!token) {
    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'b9luj7l6',
    };
    (function () {
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === 'function') {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        var d = document;
        var i = function () {
          i.c(arguments);
        };
        i.q = [];
        i.c = function (args) {
          i.q.push(args);
        };
        w.Intercom = i;
        var l = function () {
          var s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://widget.intercom.io/widget/b9luj7l6';
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        };
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();
  } else if (token && email) {
    window.intercomSettings = {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'b9luj7l6',
      name: name,
      email: emailid,
      created_at: '03/09/2022',
    };
    (function () {
      var w = window;
      var ic = w.Intercom;
      if (typeof ic === 'function') {
        ic('reattach_activator');
        ic('update', w.intercomSettings);
      } else {
        var d = document;
        var i = function () {
          i.c(arguments);
        };
        i.q = [];
        i.c = function (args) {
          i.q.push(args);
        };
        w.Intercom = i;
        var l = function () {
          var s = d.createElement('script');
          s.type = 'text/javascript';
          s.async = true;
          s.src = 'https://widget.intercom.io/widget/b9luj7l6';
          var x = d.getElementsByTagName('script')[0];
          x.parentNode.insertBefore(s, x);
        };
        if (document.readyState === 'complete') {
          l();
        } else if (w.attachEvent) {
          w.attachEvent('onload', l);
        } else {
          w.addEventListener('load', l, false);
        }
      }
    })();
  }
  //!!!!!!!!!!!!!!!!!!!!!

  const dispatch = useDispatch();
  const [bannerData, getbannerData] = useState([]);
  const [dataAbout, setDataAbout] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [pdtDta, setpdtDta] = useState([]);
  const [apiState, setApiState] = useState(true);
  const userId = useSelector((e) => e.userLogin.userDetail.id);

  const Categories = [
    {
      sno: 1,
      image: cartImgOne,
      catName: 'Matte Lipsticks',
    },
    {
      sno: 2,
      image: cartImgTwo,
      catName: 'Tomato Serum',
    },
    {
      sno: 3,
      image: cartImgThree,
      catName: 'Crossbody Bag',
    },
  ];

  const success = () => {
    message.success({
      content: 'Item Added successfully',
      duration: 4,
    });
  };

  const selectItem = (id) => {
    const data = { user_id: userId, product_id: id };

    productWishListPostService(data).then((e) => {
      if (e.status == 200) {
        success();
      } else {
        return;
      }
    });
  };

  const additem = (id) => {
    const data = { user_id: userId, product_id: id };
    dispatch({ type: 'PRODUCT_DATA_HANDLER' });
    productCartListPostService(data).then((e) => {
      if (e.status == 200) {
        success();
      } else {
        return;
      }
    });
  };
  //! API SERVICES
  useEffect(() => {
    productBannerService().then((e) => {
      if (e.status == 200) {
        setApiState(false);
        getbannerData(e.data.banner);
      } else if (e.status !== 200) {
        setApiState(false);
      }
    });
  }, []);
  useEffect(() => {
    productChooseService().then((e) => {
      if (e.status == 200) {
        setApiState(false);
        setDataAbout(e.data.chooses);
      } else if (e.status !== 200) {
        setApiState(false);
      }
    });
  }, []);
  useEffect(() => {
    productBlogsService().then((e) => {
      if (e.status == 200) {
        setApiState(false);

        setBlogData(e.data.blogs);
      } else if (e.status !== 200) {
        setApiState(false);
      }
    });
  }, []);
  useEffect(() => {
    productListService().then((e) => {
      if (e.status == 200) {
        setpdtDta(e.data.product);
      }
    });
  }, []);

  return (
    <>
      {apiState && <PageLoader />}
      {/* {modal && <LoginPop closeModal={closeModal}/>} */}
      <div className="mainSlider">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{ clickable: true }}
          effect={'fade'}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {bannerData.map((e) => {
            return (
              <SwiperSlide key={e.id}>
                <div className="slideItem" style={{ backgroundImage: `url(${IMG_PATH + e.image})` }}>
                  <Container className="dsadsad">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <h2>{e.title}</h2>
                        <p>{e.content}</p>
                        <Link className="ban-btn" to={SHOP}>
                          <i className="fa fa-plus-circle"></i>SHOP NOW
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="catHomeSec">
        <HomeProducts Categories={Categories} />
      </div>
      <div className="featureSec">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9} md={12}>
              <div className="headSection">
                <h2>Why Choose Us?</h2>
                <p>
                  Fashion and Makeup LLC provides specialized skincare and makeup products that offer customized solutions to
                  your skin problems. We understand your skin; thus, all products adhere to the highest safety and quality
                  standards. We also have the latest accessories collection to make you look gorgeous. So start your skincare
                  journey with the best-curated beauty products.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="g-0">
            {dataAbout.map((info) => {
              return (
                <Col key={info.id} lg={3} md={6} className="featureitemmain">
                  <Link to="#" className="featureitem">
                    <img src={IMG_PATH + info.backimage} />
                    <div className="featureitemInner">
                      <div className="cells__info">
                        <h3 className="featureTittle">{info.title}</h3>
                        <p>{info.content}</p>
                        <i className="fa fa-plus-circle"></i>
                      </div>
                      <div className="cells__hover">
                        <img src={IMG_PATH + info.image} />
                        <h3 className="featureTittle">{info.title}</h3>
                      </div>
                    </div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <div className="productSec">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="headSection text-start">
                <h2>Best Sellers</h2>
              </div>
            </Col>
            <Col md={4}></Col>
          </Row>
          <Row className="g-0">
            <Col>
              <div className="productSlider">
                <Products selectItem={selectItem} additem={additem} Products={pdtDta} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="productSec">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="headSection text-start">
                <h2>New Arrivals </h2>
              </div>
            </Col>
            <Col md={4}></Col>
          </Row>
          <Row className="g-0">
            <Col>
              <div className="productSlider">
                <NewArrival selectItem={selectItem} additem={additem} Products={pdtDta} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonialSec">
        <Container>
          <ComponentTestmonial />
        </Container>
      </div>
      <div className="blogSec">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} md={12}>
              <div className="headSection text-start">
                <h2>Latest Blogs</h2>
              </div>
            </Col>
            <Col lg={4} md={12}></Col>
          </Row>
          <Row className="justify-content-center">
            <div className="blog-inner">
              {blogData.map((list) => {
                return (
                  <Col lg={4} md={6}>
                    <div key={list.id} class="col-lg-4 col-md-4 col-sm-4">
                      <div class="entry-thumb image-hover2">
                        {' '}
                        <Link to={BLOG_DETAIL(list.slug, list.id)}>
                          {' '}
                          <img alt="Blog" src={IMG_PATH + list.image} />{' '}
                        </Link>{' '}
                      </div>
                      <div className="blog-preview_info">
                        <ul className="post-meta">
                          <li>
                            by <Link to="#">admin</Link>
                          </li>
                          <li>
                            <i className="fa fa-calendar"></i>
                            {list.dates}
                          </li>
                        </ul>
                        <h4 className="blog-preview_title">
                          <Link to={BLOG_DETAIL(list.slug, list.id)}>{list.title}</Link>
                        </h4>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
