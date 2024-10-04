import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductReviews from './productDetailsComponents/reviews';
import pageHeaderImg from '../../../images/about/header-inner-bg.jpg';
import Pdt_contact from './productDetailsComponents/contact-product';
import StarRating from './productDetailsComponents/starRating';

import {
  currencyExchangeService,
  productCartListPostService,
  productListService,
  productPostReviewService,
  productReviewService,
  productWishListPostService,
} from '../../../services/apiServices/apiService';
import PageLoader from '../../../layout/loader-page';
import Slider from './productDetailsComponents/ImgSlider';
import Products from '../../home/components/product';
import HelmetMeta from '../../../services/meta-helmet';
import { useDispatch, useSelector } from 'react-redux';
import BottomPopUP from '../../../layout/bottomPopups';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import { HOME, SHOP } from '../../../constants/route-path-constant';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import { CurrencyAmount } from '../../../context/currencyContext';

function Product() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatach = useDispatch();

  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [pdtDta, setpdtDta] = useState([]);
  const [apiState, setApiState] = useState(true);
  const [PopupState, setPopupState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [loginState, setloginState] = useState(false);
  const [willCheckOut, setWillCheckOut] = useState(false);
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);
  const { id, token } = useSelector((e) => e.userLogin.userDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    pdtDta.filter((item) => (item.id == params.pid ? setItems(item) : ' '));
  }, [params.pid, []]);

  useEffect(() => {
    productReviewService(params.pid).then((e) => {
      if (e.status == 200) {
        setData(e.data.reviews);
        console.log(e.data.reviews);
      }
    });
  }, [params.pid]);

  //* WISHLIST L0GIC

  useEffect(() => {
    productListService().then((e) => {
      if (e.status == 200) {
        setApiState(false);
        setpdtDta(e.data.product);
      }
    });
  }, [params.pid]);

  useEffect(() => {
    productListService().then((e) => {
      if (e.status == 200) {
        setApiState(false);
        setpdtDta(e.data.product);
      }
    });
  }, []);

  //* REVIEW SUBMIT

  const reviewData = (rating, review, img1, img2) => {
    let obj = {
      product_id: items.id,
      description: review,
      rating: rating,
      user_id: id,
      img1: img1,
      img2: img2,
    };
    productPostReviewService(obj).then((e) => e);
  };
  const addButtonHandler = () => {
    setloginState(true);
    setTimeout(() => {
      setloginState(false);
    }, 1500);
  };

  const success = () => {
    message.success({
      content: 'Item Added successfully',
      duration: 4,
    });
  };

  const selectItem = (pid) => {
    const data = { user_id: id, product_id: pid };

    productWishListPostService(data).then((e) => {
      if (e.status == 200) {
        success();
      } else {
        setErrorState(true);
        setTimeout(() => {
          setErrorState(false);
        }, 4000);
      }
    });
  };

  const buyNowHandler = (pid) => {
    const data = { user_id: id, product_id: pid };
    dispatch({ type: 'PRODUCT_DATA_HANDLER' });
    productCartListPostService(data).then((e) => {
      if (e.status == 200) {
        success();
        navigate('/checkout');
      } else {
        setErrorState(true);
        setTimeout(() => {
          setErrorState(false);
        }, 4000);
      }
    });
  };

  const additem = (pid) => {
    const data = { user_id: id, product_id: pid };
    dispatch({ type: 'PRODUCT_DATA_HANDLER' });
    productCartListPostService(data).then((e) => {
      if (e.status == 200) {
        success();
        setWillCheckOut(true);
      } else {
        setErrorState(true);
        setTimeout(() => {
          setErrorState(false);
        }, 4000);
      }
    });
  };
  const cartHandler = (id, title, price, image) => {
    success();
    dispatach({ type: 'ADD_ITEM', payload: { id: id, title: title, price: price, image: image } });
    setWillCheckOut(true);
  };

  return (
    <>
      {apiState && <PageLoader />}
      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Product Details</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={SHOP}>All Products</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{items.name}</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <HelmetMeta title={items.meta_title} keyword={items.meta_keyword} discription={items.meta_description} />
      <Container>
        <Row>
          <Slider image={items.image} />

          <Col lg={6} md={12} className="mt-5 mb-5">
            <div class="product-dtl">
              <div class="product-info">
                <div class="product-name">
                  <h1>{items ? items.name : 'tittle'}</h1>
                </div>
                <div className="reviews-counter">
                  <StarRating reviewData={reviewData} />
                  <span>{data?.length} reviews</span>
                </div>
                <div className="product-price-discount">
                  <h3>
                    <span>
                      {' '}
                      {Currency}{' '}
                      {Currency == 'SAR'
                        ? Math.ceil(items.price * saRates).toFixed(2)
                        : Currency == 'AED'
                        ? Math.ceil(items.price * aedRates).toFixed(2)
                        : Currency == 'QAR'
                        ? Math.ceil(items.price * qarRate).toFixed(2)
                        : items.price}
                    </span>
                  </h3>
                </div>
                <div className="sub_discription">
                  <p>
                    Brand : <span> {items.brand}</span>{' '}
                  </p>
                  <p>
                    category : <span>{items.category_id}</span>{' '}
                  </p>
                  <p>
                    size : <span>{items.size}</span>{' '}
                  </p>
                </div>
              </div>

              <div className="pdt-addto-cart">
                <div className="btns-ght">
                  <button
                    onClick={() => (token ? buyNowHandler(items.id) : navigate('/checkout'))}
                    className={'product-count round-black-btn'}
                  >
                    buy now
                  </button>
                  <button
                    onClick={
                      token ? () => additem(items.id) : () => cartHandler(items.id, items.name, items.price, items.image)
                    }
                    className={'product-count round-black-btn'}
                  >
                    Add to Cart
                  </button>
                  <button onClick={token ? () => selectItem(items.id) : addButtonHandler} className={'pdt-minus-btn '}>
                    <i class="fa fa-heart"></i>
                  </button>
                </div>
              </div>
              {willCheckOut && (
                <button onClick={() => navigate('/checkout')} className="btn-prcd_checkout">
                  proceed checkout <i style={{ marginLeft: '15px' }} class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </button>
              )}
              <div
                className="mb-4"
                dangerouslySetInnerHTML={{
                  __html: items.description,
                }}
              ></div>
              <div className="social">
                <div className="social-btn fb">
                  <i class="fa fa-facebook"></i>
                </div>
                <div className="social-btn tw">
                  <i class="fa fa-twitter"></i>
                </div>
                <div className="social-btn ista">
                  <i class="fa fa-instagram"></i>
                </div>
                <div className="social-btn ldn">
                  <i class="fa fa-linkedin"></i>
                </div>
              </div>
            </div>
          </Col>

          <Col className="mb-5 mt-5">
            <Tabs defaultActiveKey="reviews" id="fill-tab-example" className="mb-3" fill>
              <Tab eventKey="discription" title="Description">
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: items.description,
                  }}
                ></div>
              </Tab>
              <Tab eventKey="reviews" title="Product review">
                <ProductReviews data={data} />
              </Tab>
              <Tab eventKey="contact" title="Contact">
                <Pdt_contact />
              </Tab>
            </Tabs>
          </Col>

          <Products selectItem={selectItem} additem={additem} Products={pdtDta} />
        </Row>
      </Container>

      {errorState && (
        <div className="bottom_popup">
          <BottomPopUP status={400} message={'there is Internal server error !! try again  '} />
        </div>
      )}
      {loginState && (
        <div className="bottom_popup">
          <BottomPopUP status={201} message={'Login first !!'} />
        </div>
      )}
    </>
  );
}

export default Product;
