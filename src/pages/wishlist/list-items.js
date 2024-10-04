import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import { IMG_PATH } from '../../constants/path-constants';
import BottomPopUP from '../../layout/bottomPopups';
import {
  productWishListService,
  productDeleteWishitemService,
  productCartListPostService,
} from '../../services/apiServices/apiService';
import { CurrencyAmount } from '../../context/currencyContext';

const WishlsitItems = (props) => {
  const dispatch = useDispatch();
  const { id, token } = useSelector((e) => e.userLogin.userDetail);

  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);

  const [products, SetProducts] = useState([]);
  const [PopupState, setPopupState] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const deleteHandler = (pid) => {
    props.clsModals();
    productDeleteWishitemService(id, pid).then((e) => {
      if (e.status == 200) {
        props.clsModals();
        productWishListService(id).then((e) => {
          if (e.status == 200) {
            SetProducts(e.data.Wishlist);
            props.clsModal();
          }
        });
      }
    });
  };

  const addItem = (pid) => {
    const data = { user_id: id, product_id: pid };

    productCartListPostService(data).then((e) => {
      if (e.status == 200) {
        setPopupState(true);
        setTimeout(() => {
          setPopupState(false);
        }, 4000);
      } else {
        setErrorState(true);
        setTimeout(() => {
          setErrorState(false);
        }, 4000);
      }
    });
  };

  useEffect(() => {
    productWishListService(id).then((e) => {
      if (e.status == 200) {
        SetProducts(e.data.Wishlist);
        props.clsModal();
      }
    });
  }, []);

  return (
    <>
      <div className="wishList-cont">
        {!token ? (
          <div className="wishlist_auth">
            <div className="ero_modal">
              <p>login to see your wishlist</p>
              <button className="ero_btn">
                <Link to={'/login'}>login</Link>
              </button>
            </div>
            <div className="emt-wishlist">
              <i class="fa fa-heart" aria-hidden="true"></i>
              <p>Your wishlist is empty!</p>
              <h6>Explore more and shorlist some items</h6>
              <Link to={'/shop'}>START SHOPPING</Link>
            </div>
          </div>
        ) : (
          <div>
            {' '}
            {products.length == 0 ? (
              ''
            ) : (
              <div className="cartItem">
                <div className="productList">
                  <div>Product Name</div>
                </div>
                <div className="sublist QutPrice priceretop">price</div>
              </div>
            )}
            {products.length == 0 ? (
              <div className="emt-wishlist">
                <i class="fa fa-heart" aria-hidden="true"></i>
                <p>Your wishlist is empty!</p>
                <h6>Explore more and shorlist some items</h6>
                <Link to={'/shop'}>START SHOPPING</Link>
              </div>
            ) : (
              products.map((e) => {
                return (
                  <div key={e.id} className="cartItems">
                    <div className="productList">
                      <div className="productImage">
                        <img src={IMG_PATH + e.image} />
                      </div>
                      <div
                        style={{
                          width: '80%',
                          marginLeft: '5px',
                          paddingLeft: '10px',
                        }}
                      >
                        <p style={{ marginBottom: 0, color: '#445a69' }}>{e.name}</p>
                        <p
                          id="wish_p"
                          style={{
                            marginBottom: 0,
                            fontSize: '11px',
                            fontWeight: '300',
                            maxWidth: '100%',
                            width: '100%',
                          }}
                          dangerouslySetInnerHTML={{ __html: e.description }}
                        />
                      </div>
                    </div>
                    <div className="sublis subtotalt res-price">
                      <span className="pricere">price </span>
                      {Currency}{' '}
                      {Currency == 'SAR'
                        ? Math.ceil(e.price * saRates).toFixed(2)
                        : Currency == 'AED'
                        ? Math.ceil(e.price * aedRates).toFixed(2)
                        : Currency == 'QAR'
                        ? Math.ceil(e.price * qarRate).toFixed(2)
                        : e.price}
                    </div>
                    <i onClick={() => deleteHandler(e.id)} class="fa fa-trash-o" aria-hidden="true"></i>
                    <p onClick={() => addItem(e.product_id)} className="wsl-add_to_cart">
                      add to cart
                    </p>
                  </div>
                );
              })
            )}
          </div>
        )}

        <div className="wishlist-action_handler">
          <button onClick={() => window.location.reload()} className="btn-empty">
            <span>
              <i class="fa fa-refresh" aria-hidden="true"></i>{' '}
            </span>{' '}
            Update Wishlist
          </button>
        </div>
      </div>
      {PopupState && (
        <div className="bottom_popup">
          <BottomPopUP status={200} message={'item added successfully !!'} />
        </div>
      )}

      {errorState && (
        <div className="bottom_popup">
          <BottomPopUP status={400} message={'there is Internal server error !! try again  '} />
        </div>
      )}
    </>
  );
};

export default WishlsitItems;
