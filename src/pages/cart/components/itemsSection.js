import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { IMG_PATH } from '../../../constants/path-constants';
import { CurrencyAmount } from '../../../context/currencyContext';

function ItemSec(props) {
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { saRates, aedRates, qarRate } = useContext(CurrencyAmount);
  return (
    <>
      {props.products.map((data) => {
        const { id, image, name, price, totalPrice } = data;
        
        return (
          <tr key={id}>
            <td>
              <button disabled={props.cartState ? false : true} onClick={() => props.deleteItem(id)} className="prdct-delete">
                {props.cartState ? <i className="fa fa-trash" aria-hidden="true"></i> : <div class="delete_loader"> </div>}
              </button>
            </td>
            <td>
              <div className="product-img">
                <img src={IMG_PATH + image} alt="" />
              </div>
            </td>
            <td>
              <div className="product-name-cart">
                <p>{name}</p>
              </div>
            </td>
            <td>
              {Currency}{' '}
              {Currency == 'SAR'
                ? Math.ceil(price || totalPrice * saRates).toFixed(2)
                : Currency == 'AED'
                ? Math.ceil(price || totalPrice * aedRates).toFixed(2)
                : Currency == 'QAR'
                ? Math.ceil(price || totalPrice * qarRate).toFixed(2)
                : price || totalPrice}
            </td>
            <td></td>
          </tr>
        );
      })}
    </>
  );
}

export default ItemSec;
