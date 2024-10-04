import React, { useEffect, useState } from 'react';
import SliderSweeperComponent from '../../layout/slider';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Link, useSearchParams } from 'react-router-dom';
import { IMG_PATH } from '../../constants/path-constants';
import {
  productShopSliderService,
  productShopadService,
  productcategoryService,
  productCartListPostService,
} from '../../services/apiServices/apiService';
import ShopFilterComponent from './components/shopFilterCategories';
import ShopAdComponent from './components/shopAdCategories';
import ShopProductCategories from './components/shopProductCategories';
import PageLoader from '../../layout/loader-page';
import { productListService, productWishListService, productWishListPostService } from '../../services/apiServices/apiService';
import BottomPopUP from '../../layout/bottomPopups';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';

function NewPage() {
  const [data, setData] = useState([]);
  const [pdtDta, setpdtDta] = useState([]);
  const [add, setad] = useState([]);
  const [category, setCategory] = useState([]);
  const [priceData, setPriceData] = useState(10000);
  const [apiState, setApiState] = useState(true);
  const [activeFilter, setActiveFilters] = useState([]);
  const [colorFilter, setColorFilters] = useState([]);
  const [sizeFilter, setSizeFilters] = useState([]);
  const [PopupState, setPopupState] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [searchColorParams, setSearchColorParams] = useSearchParams();
  //* userId
  const userId = useSelector((e) => e.userLogin.userDetail.id);
  const dispatch = useDispatch();
  //! API SERVICES

  useEffect(() => {
    productShopSliderService().then((e) => {
      if (e.status == 200) {
        setData(e.data.slider);
      }
    });
    productShopadService().then((e) => {
      setad(e.data.offers);
    });
    productcategoryService().then((e) => {
      setCategory(e.data.Category);
    });
  }, []);

  useEffect(() => {
    productListService().then((e) => {
      if (e.status == 200) {
        setpdtDta(e.data.product);
        setApiState(false);
      } else {
        setApiState(false);
      }
    });
  }, []);

  const success = () => {
    message.success({
      content: 'Item Added successfully',
      duration: 4,
    });
  };

  //* query params

  useEffect(() => {
    if (activeFilter.length > 0 || colorFilter.length > 0 || sizeFilter.length > 0) {
      setSearchColorParams({ filter: true });
    } else if (activeFilter.length == 0 || colorFilter.length > 0 || sizeFilter.length > 0) {
      setSearchColorParams();
    }
  }, [activeFilter, colorFilter, sizeFilter]);

  //* ADD TO CART WISHLIST DISPATCH

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

  //*FILTERS LOGIC
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
  const sortHandler = (e) => {
    setSortValue(e.target.value);
  };

  return (
    <>
      {apiState && <PageLoader />}
      <div class="main-container col2-left-layout bounceInUp animated">
        <div class="shop_main">
          <div class="row">
            <div class="col-sm-9 col-lg-9 col-md-12 col-sm-push-3 col-product">
              <div className="swepper">
                <SliderSweeperComponent data={data} />
              </div>
              <article className="col-main">
                <div className="category-products">
                  <ShopProductCategories
                    sizeFilter={sizeFilter}
                    colorFilter={colorFilter}
                    activeFilter={activeFilter}
                    productData={pdtDta}
                    addProductDataToCart={additem}
                    addProductDataToWishList={selectItem}
                    priceRange={priceData}
                  />
                </div>
              </article>
            </div>
            <div class="col-left sidebar col-lg-3 col-md-12  col-sm-12 col-xs-12 col-sm-pull-9">
              <aside class="col-left sidebar">
                <ShopFilterComponent
                  colorCheckedFun={colorCheckedFun}
                  brandCheckedFun={brandCheckedFun}
                  sizeCheckedFun={sizeCheckedFun}
                  priceHandler={priceHandler}
                  list={pdtDta}
                  priceData={priceData}
                />
              </aside>

              <div class="side-nav-categories">
                <div class="block-title">Categories</div>
                <div class="allPtd_category">
                  {category.map((list) => {
                    return (
                      <li key={list.id}>
                        <Link to={`/category/${list.name.replaceAll(' ', '-')}`}>{list.name}</Link>
                      </li>
                    );
                  })}
                </div>
              </div>
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
}

export default NewPage;
