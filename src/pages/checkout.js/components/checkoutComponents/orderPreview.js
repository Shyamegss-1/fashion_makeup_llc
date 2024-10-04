import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_PATH } from '../../../../constants/path-constants';
import { productCartListService, productDeleteCartItemService } from '../../../../services/apiServices/apiService';
import './orderReview.css';
import { Button, notification, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { CurrencyAmount } from '../../../../context/currencyContext';
const { Option } = Select;

function OrderPrivew(props) {
  const dispatch = useDispatch();
  const { id, token } = useSelector((e) => e.userLogin.userDetail);
  var { items } = useSelector((e) => e.cartReducer);
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);
  const [count, setCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLocalTotal, setCartLocalTotal] = useState(0);
  const [preview, setPreview] = useState([]);
  const [cartPreview, setCartPreview] = useState([]);
  const [data, setData] = useState([]);
  const [pdata, setpdata] = useState([]);
  const [dis, setDis] = useState(false);

  useEffect(() => {
    let array = [];
    setData(items);
    for (let el of items) {
      array.push({
        user_id: id,
        product_id: Number(el.id),
        product_quantity: 1,
        coupon_id: 0,
        paying_amount: Number(el.totalPrice),
      });
    }
    setCartPreview(array);
  }, [items]);

  useEffect(() => {
    let isActive = true;
    const array = [];
    productCartListService(id).then((e) => {
      if (isActive) {
        setpdata(e.data.carts);
        for (let el of e.data.carts) {
          array.push({
            user_id: id,
            product_id: Number(el.product_id),
            product_quantity: 1,
            coupon_id: 0,
            primary_address: 1,
            secoundry_address: 0,
            paying_amount: Number(el.price),
          });
        }
      }
    });
    setPreview(array);
    return () => {
      isActive = false;
    };
  }, []);

  //****************** */
  const quantityHandler = (e, pid) => {
    setCount(count + 1);
    const existingItem = preview.find((item) => item.product_id === Number(pid));
    let price = pdata.filter((e) => e.product_id == Number(pid)).map((e) => e.price)[0];
    existingItem.product_quantity = Number(e);
    existingItem.paying_amount = price * Number(e);
  };

  const CartquantityHandler = (e, pid) => {
    setCount(count + 1);
    const existingItem = cartPreview.find((item) => item.product_id === pid);
    let price = data.filter((e) => e.id == Number(pid)).map((e) => e.price)[0];
    existingItem.product_quantity = Number(e);
    existingItem.paying_amount = price * Number(e);
  };

  //*******************totalAmount */

  const sumItems = () => {
    let sum = 0;
    preview.forEach(function (item) {
      let calculation = Math.trunc(item.paying_amount);
      sum += calculation;
    });

    setCartTotal(sum);
  };
  useEffect(() => {
    sumItems();
  }, [quantityHandler, CartquantityHandler]);

  const cartItems = () => {
    let sum = 0;
    cartPreview?.forEach(function (item) {
      let calculation = Math.trunc(item.paying_amount);
      sum += calculation;
    });
    setCartLocalTotal(sum);
  };
  useEffect(() => {
    sumItems();
    cartItems();
  }, [quantityHandler, CartquantityHandler]);

  useEffect(() => {
    props.setTotalAmount(cartTotal + cartLocalTotal);
  }, [quantityHandler, count, CartquantityHandler, quantityHandler, CartquantityHandler, preview, cartPreview]);

  //!!!!!!!!!!!!!!!!!!!!!

  //************** */

  const cartdeleteHandler = (pid) => {
    setCount(count + 1);
    openNotificationWithIcon('success');
    dispatch({ type: 'DELETE_ITEM', payload: pid });
    if (count == data?.length) {
      window.location.reload();
    }
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Item Removed Successfully',
    });
  };

  const deleteHandler = (pid) => {
    setCount(count + 1);
    dispatch({
      type: 'PRODUCT_DATA_HANDLER',
    });
    productDeleteCartItemService(id, pid).then((e) => {
      setDis(true);
      if (e.status == 200) {
        openNotificationWithIcon('success');
        productCartListService(id).then((e) => {
          if (e.status == 200) {
            setDis(false);
            setpdata(e.data.carts);
            window.location.reload();
          }
        });
      }
    });
    if (count == pdata?.length) {
      window.location.reload();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      props.setPreview([...preview, ...cartPreview]);
    }, 1000);
  }, [props.count, pdata, data]);

  return (
    <>
      <div className="checkOut-orderReview">
        {data.length > 0 || pdata.length > 0 ? (
          <div>
            <ul>
              {pdata.map((e) => {
                return (
                  <div id={e.id} key={'sadasd' + e.id} className="check_out_items">
                    <li id="image">
                      <img src={IMG_PATH + e.image} />
                    </li>
                    <li id="name">
                      <li style={{ fontWeight: '600' }}>{e.name}</li>
                    </li>
                    <li id="qnt">
                      {Currency == 'SAR'
                        ? Math.ceil(e.price * saRates).toFixed(2)
                        : Currency == 'AED'
                        ? Math.ceil(e.price * aedRates).toFixed(2)
                        : Currency == 'QAR'
                        ? Math.ceil(e.price * qarRate).toFixed(2)
                        : e.price}
                    </li>
                    <li id="delete">
                      <Button
                        type="primary"
                        onClick={() => {
                          deleteHandler(e.id);
                        }}
                        disabled={dis}
                        shape="circle"
                        icon={<DeleteOutlined />}
                        danger
                      ></Button>
                    </li>
                    <li id="price">
                      <Select
                        onChange={(elm) => quantityHandler(elm, e.product_id)}
                        defaultValue="1"
                        style={{
                          width: 50,
                        }}
                      >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    </li>
                  </div>
                );
              })}
            </ul>
            <ul>
              {data.map((e) => {
                return (
                  <div id={e.id} className="check_out_items">
                    <li id="image">
                      <img src={IMG_PATH + e.image} />
                    </li>
                    <li id="name">
                      <li style={{ fontWeight: '600' }}>{e.name}</li>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit consequatur quos cupiditate!
                      </li>
                    </li>
                    <li id="qnt">
                      {' '}
                      {Currency}{' '}
                      {Currency == 'SAR'
                        ? Math.ceil(e.totalPrice * saRates).toFixed(2)
                        : Currency == 'AED'
                        ? Math.ceil(e.totalPrice * aedRates).toFixed(2)
                        : Currency == 'QAR'
                        ? Math.ceil(e.totalPrice * qarRate).toFixed(2)
                        : e.totalPrice}
                    </li>
                    <li id="delete">
                      {' '}
                      <Button
                        type="primary"
                        onClick={() => cartdeleteHandler(e.id)}
                        shape="circle"
                        disabled={dis}
                        icon={<DeleteOutlined />}
                        danger
                      ></Button>
                    </li>
                    <li id="price">
                      <Select
                        onChange={(et) => CartquantityHandler(et, e.id)}
                        defaultValue="1"
                        style={{
                          width: 50,
                        }}
                      >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="empty-checkout">
            <h2>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </h2>
            <p>cart is empty</p>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderPrivew;
