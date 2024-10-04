import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import ItemSec from './components/itemsSection.js';
import { CART, CHECKOUT } from '../../constants/route-path-constant';
import { Empty } from 'antd';
import 'antd/dist/antd.css';
import { productCartListService, productDeleteCartItemService } from '../../services/apiServices/apiService.js';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { id, token } = useSelector((e) => e.userLogin.userDetail);
  const { items, totalItem, totalAmount } = useSelector((e) => e.cartReducer);

  const [products, SetProducts] = useState([]);
  const [cartState, setCartState] = useState(true);

  const deleteHandler = (pid) => {
    let isActive = true;
    dispatch({
      type: 'PRODUCT_DATA_HANDLER',
    });

    setCartState(false);
    if (isActive) {
      productDeleteCartItemService(id, pid).then((e) => {
        if (e.status == 200) {
          productCartListService(id).then((e) => {
            if (e.status == 200) {
              setCartState(true);
              props.setResponse(e.data.carts);
              SetProducts(e.data.carts);
            }
          });
        } else {
          setCartState(true);
          return;
        }
      });
    }
    return () => {
      isActive = false;
    };
  };

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      productCartListService(id).then((e) => {
        props.setApiState(false);
        SetProducts(e.data.carts);
        props.setResponse(e.data.carts);
      });
    }
    return () => {
      isActive = false;
    };
  }, []);

  const cartdeleteHandler = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
    window.location.reload();
  };

  return (
    <>
      <div className="cart_cont">
        {' '}
        <div className="row justify-content-center m-8">
          <div className="col-md">
            <div
              className="card"
              style={{
                position: 'relative',
              }}
            >
              <div className="card-header bg-dark p-3"> </div>{' '}
              <div className="card-body p-0">
                {' '}
                {products?.length === 0 && items?.length === 0 ? (
                  <Empty description={'your cart is empty'} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                ) : (
                  <table className="table cart-table mb-0">
                    <thead>
                      <tr>
                        <th> Action </th> <th> Product </th> <th> Name </th> <th> Price </th>{' '}
                      </tr>{' '}
                    </thead>{' '}
                    <tbody>
                      <ItemSec products={products} deleteItem={deleteHandler} cartState={cartState} />
                      <ItemSec products={items} deleteItem={cartdeleteHandler} cartState={cartState} />{' '}
                    </tbody>{' '}
                  </table>
                )}{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>
      </div>{' '}
    </>
  );
};
export default CartItem;
