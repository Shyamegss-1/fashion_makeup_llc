import { createAction } from 'redux-actions';

export const FETCH_PRODUCT_DETAILS = 'FETCH_PRODUCT_DETAILS';
export const detailsProduct = createAction(FETCH_PRODUCT_DETAILS);

export const CURRENCT_CURRENCY = 'CURRENCT_CURRENCY';
export const selectedCurrency = createAction(CURRENCT_CURRENCY);
