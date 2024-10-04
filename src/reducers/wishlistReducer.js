import { FETCH_PRODUCT_DETAILS, CURRENCT_CURRENCY } from '../actions/wishList-Action';

const initialState = {
  items: 0,
  Currency: 'USD',
};
const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_DETAILS:
      return {
        ...state,
        items: state.items + 1,
      };
    case CURRENCT_CURRENCY:
      return {
        ...state,
        Currency: action.payload,
      };

    default:
      return state;
  }
};
export default wishlistReducer;
