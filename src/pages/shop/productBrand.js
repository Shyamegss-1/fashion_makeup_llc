import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Row, Col, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import '../../shop.css';
import {
  productCartListPostService,
  productListService,
  productShopadService,
  productWishListPostService,
} from '../../services/apiServices/apiService';
import ShopAdComponent from './components/shopAdCategories';
import ShopFilterComponent from './components/shopFilterCategories';
import ShopProductCategories from './components/shopProductCategories';
import BottomPopUP from '../../layout/bottomPopups';
import PageLoader from '../../layout/loader-page';
import 'antd/dist/antd.css';
import { Breadcrumb } from 'antd';
import { HOME } from '../../constants/route-path-constant';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';

const ProductBrand = () => {
  const userId = useSelector((e) => e.userLogin.userDetail.id);
  const dispatch = useDispatch();
  const params = useParams();

  const [priceData, setPriceData] = useState(10000);
  const [pdata, setPdata] = useState([]);
  const [data, setData] = useState([]);
  const [add, setad] = useState([]);
  const [activeFilter, setActiveFilters] = useState([]);
  const [colorFilter, setColorFilters] = useState([]);
  const [sizeFilter, setSizeFilters] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [apiState, setApiState] = useState(true);

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
        setErrorState(true);
        setTimeout(() => {
          setErrorState(false);
        }, 4000);
      }
    });
  };

  useEffect(() => {
    productShopadService().then((e) => {
      setad(e.data.offers);
    });
  }, []);

  const additem = (id) => {
    const data = { user_id: userId, product_id: id };
    dispatch({ type: 'PRODUCT_DATA_HANDLER' });
    productCartListPostService(data).then((e) => {
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

  const priceHandler = (e) => {
    setPriceData(e.target.value);
  };

  const brandCheckedFun = (e) => {
    if (activeFilter.includes(e.target.value)) {
      const filterIndex = activeFilter.indexOf(e.target.value);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      setActiveFilters(newFilter);
    } else {
      setActiveFilters([...activeFilter, e.target.value]);
    }
  };
  const colorCheckedFun = (e) => {
    if (colorFilter.includes(e.target.value)) {
      const filterIndex = colorFilter.indexOf(e.target.value);
      const newFilter = [...colorFilter];
      newFilter.splice(filterIndex, 1);
      setColorFilters(newFilter);
    } else {
      setColorFilters([...colorFilter, e.target.value]);
    }
  };
  const sizeCheckedFun = (e) => {
    if (sizeFilter.includes(e.target.value)) {
      const filterIndex = sizeFilter.indexOf(e.target.value);
      const newFilter = [...sizeFilter];
      newFilter.splice(filterIndex, 1);
      setSizeFilters(newFilter);
    } else {
      setSizeFilters([...sizeFilter, e.target.value]);
    }
  };

  useEffect(() => {
    productListService().then((e) => {
      let dataArry = [];
      let pdataArray = [];
      if (e.status == 200) {
        setApiState(false);
        for (let obj of e.data.product) {
          pdataArray.push(obj);
          if (obj.brand.replaceAll('-', ' ') == params.bname.replaceAll('-', ' ')) {
            dataArry.push(obj);
          }
        }
      }
      setData(dataArry);
      setPdata(pdataArray);
    });
  }, []);
  useEffect(() => {
    let data = pdata.filter((e) => e.brand.replaceAll('-', ' ') == params.bname.replaceAll('-', ' '));
    setData(data);
  }, [params.bname]);

  return (
    <>
      {apiState && <PageLoader />}

      <div
        className="breadCumbHead"
        style={{ backgroundImage: `url(${'http://themesground.com/covmed/demo/V3/images/header-inner-bg.jpg'})` }}
      >
        <Container>
          <Row>
            <Col>
              <h1>{params.bname}</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product Brand</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <div className="main-container col2-left-layout bounceInUp animated">
        <div className="shop_main">
          <div className="row">
            <div className="col-lg-9 col-md-12 col-sm-12  col-sm-push-3 col-product">
              <article className="col-main" style={{ margin: '57px 0px' }}>
                <div className="category-products">
                  <ul className="products-grid">
                    {data.length !== 0 ? (
                      <ShopProductCategories
                        colorFilter={colorFilter}
                        sizeFilter={sizeFilter}
                        activeFilter={activeFilter}
                        productData={data}
                        priceRange={priceData}
                        addProductDataToCart={additem}
                        addProductDataToWishList={selectItem}
                      />
                    ) : (
                      <div className="items-not-matched">
                        <h1>No Item Found</h1>
                        <Link to="/shop">
                          <button>Check out Other Products</button>
                        </Link>
                      </div>
                    )}
                  </ul>
                </div>
              </article>
            </div>
            <div className="col-left  sidebar col-lg-3 col-md-12 col-sm-12 col-xs-12 col-sm-pull-9">
              <aside className="col-left sidebar">
                <div className="side-nav-categories">
                  <ShopFilterComponent
                    sizeCheckedFun={sizeCheckedFun}
                    colorCheckedFun={colorCheckedFun}
                    brandCheckedFun={brandCheckedFun}
                    priceHandler={priceHandler}
                    list={data}
                    priceData={priceData}
                  />
                  <ShopAdComponent add={add} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      {errorState && (
        <div className="bottom_popup">
          <BottomPopUP status={400} message={'there is Internal server error !! try again  '} />
        </div>
      )}
    </>
  );
};

export default ProductBrand;
