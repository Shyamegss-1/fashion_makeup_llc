import { useEffect, useState, useMemo, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IMG_PATH } from '../../../constants/path-constants';
import Pagination from './pagination/pagination';
import { currencyExchangeService, productcategoryService } from '../../../services/apiServices/apiService.js';
import HelmetMeta from '../../../services/meta-helmet';
import { useDispatch, useSelector } from 'react-redux';
import BottomPopUP from '../../../layout/bottomPopups';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import { CurrencyAmount } from '../../../context/currencyContext';

let PageSize = 6;
const ShopProductCategories = (props) => {
  const dispatach = useDispatch();
  const { token } = useSelector((e) => e.userLogin.userDetail);
  const [loginState, setloginState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterList, setFilterList] = useState([]);
  const [PopupState, setPopupState] = useState(false);
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);

  let filteredList = props.productData;

  //* filter function
  const filterFunction = useMemo(() => {
    let updated = filteredList;

    if (props.activeFilter.length > 0 || props.activeFilter.length === []) {
      updated = updated.filter((item) => props.activeFilter.includes(item.brand));
    }
    if (props?.colorFilter?.length > 0 || props.colorFilter.length === []) {
      updated = updated.filter((item) => props.colorFilter.includes(item.color));
    }
    if (props?.sizeFilter?.length > 0 || props.sizeFilter.length === []) {
      updated = updated.filter((item) => props.sizeFilter.includes(item.size));
    }

    return setFilterList(updated);
  }, [props, props.colorFilter, props.sizeFilter, props.activeFilter]);

  //* pagination logic
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return filterList
      .filter((e) => Math.trunc(e.price) > 0 && Math.trunc(e.price) < props.priceRange)
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, props.colorFilter, props.sizeFilter, props.activeFilter, []]);

  //* scrollTop behavior
  // useEffect(() => {
  //   window.scrollTo({ behavior: 'smooth', top: '2000px' });
  // }, [currentPage]);
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
    dispatach({ type: 'ADD_ITEM', payload: { id: id, title: title, price: price, image: image } });
  };

  return (
    <>
      <ul className="products-grid">
        {currentTableData?.length > 0 ? (
          currentTableData.map((item) => {
            return (
              <>
                <HelmetMeta
                  title={item.meta_title.replaceAll(' ', '-')}
                  keyword={item.meta_keyword.replaceAll(' ', '-')}
                  discription={item.meta_description.replaceAll(' ', '-')}
                />
                <li key={item.id} className="item col-lg-4 col-md-4 col-sm-4 col-xs-12">
                  <div className="item-inner">
                    <div className="productborder">
                      <div className="item-img">
                        <div className="item-img-info">
                          {' '}
                          <Link
                            className="product_image image-wrapper"
                            to={`/product/${item.name.replaceAll(' ', '-')}/${item.id}`}
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
                                      ? () => props.addProductDataToCart(item.id)
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
                                  to={`/product/${item.name.replaceAll(' ', '-')}/${item.id}`}
                                  className="button detail-bnt"
                                >
                                  <span>Quick View</span>
                                </Link>
                              </div>
                              <div className="actions">
                                <span className="add-to-links">
                                  <Link
                                    to={'#'}
                                    onClick={token ? () => props.addProductDataToWishList(item.id) : addButtonHandler}
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
                              <Link title="Bluetooth Smart Watch" to={`/product/${item.name}/${item.id}`}>
                                {item.name}
                              </Link>
                              <h5> {item.category_id} </h5>
                            </div>
                            <div className="item-price">
                              <div className="price-box">
                                {' '}
                                <span className="regular-price">
                                  {' '}
                                  <span className="price">
                                    {' '}
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
              </>
            );
          })
        ) : (
          <div style={{ width: '100%', textAlign: 'center', fontSize: '25px', paddingTop: '20%' }}>
            <p style={{ textAlign: 'center' }}>no item !!</p>
          </div>
        )}
      </ul>
      {currentTableData?.length <= 6 && filterList?.length <= 6 ? null : (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={props.productData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {loginState && (
        <div className="bottom_popup">
          <BottomPopUP status={201} message={'Login first !!'} />
        </div>
      )}
    </>
  );
};

export default ShopProductCategories;
