import { API_PATH } from '../../constants/path-constants';
import { fetch } from '../fetchService';

export const productBlogsService = () => {
  return fetch('get', API_PATH + `blogs`, {}, {});
};

export const productBannerService = () => {
  return fetch('get', API_PATH + `banner`, {}, {});
};

export const productTestmonialService = () => {
  return fetch('get', API_PATH + `testmonial`, {}, {});
};
export const productChooseService = () => {
  return fetch('get', API_PATH + `choose`, {}, {});
};

export const productRegisterUser = (options) => {
  return fetch('post', 'https://fashionandmakeupusa.com/admin/api/register', { ...options }, {});
};

export const productuserSignin = (options) => {
  return fetch('post', API_PATH + `signup`, { ...options }, {});
};

export const productAboutusService = () => {
  return fetch('get', API_PATH + `about-us`, {}, {});
};
export const productShopSliderService = () => {
  return fetch('get', API_PATH + `slider`, {}, {});
};

export const productShopadService = () => {
  return fetch('get', API_PATH + `offers`, {}, {});
};
export const productContactUsService = (options) => {
  return fetch('post', API_PATH + `contact`, { ...options }, {});
};

export const productcategoryService = () => {
  return fetch('get', API_PATH + `category`, {}, {});
};

//* prodcut WishList service
export const productWishListService = (id) => {
  return fetch('get', API_PATH + `wishlist/${id}`, {}, {});
};

export const productWishListPostService = (options) => {
  return fetch('post', API_PATH + `wishlistPost`, { ...options }, {});
};

export const productListService = () => {
  return fetch('get', API_PATH + `product`, {}, {});
};

export const productDeleteWishitemService = (uid, pid) => {
  return fetch('get', API_PATH + `delete_wishlist/${uid}/${pid} `, {}, {});
};

//* prodcut cart service
export const productCartListPostService = (options) => {
  return fetch('post', API_PATH + `cart`, { ...options }, {});
};

export const productCartListService = (id) => {
  return fetch('get', API_PATH + `cartlist/${id}`, {}, {});
};

export const productDeleteCartItemService = (uid, pid) => {
  return fetch('get', API_PATH + `delete_cart/${uid}/${pid} `, {}, {});
};

//* prodcut review service
export const productPostReviewService = (options) => {
  return fetch('post', API_PATH + `addreview`, { ...options }, {});
};

export const productReviewService = (Pid) => {
  return fetch('get', API_PATH + `review/${Pid}`, {}, {});
};

//* user address service

export const userPrimAddService = (Pid) => {
  return fetch('get', API_PATH + `primary-address/${Pid}`, {}, {});
};
export const userSecAddService = (Pid) => {
  return fetch('get', API_PATH + `secondary-address/${Pid}`, {}, {});
};
export const userSecPostService = (option) => {
  return fetch('post', API_PATH + `add-secondary-address`, { ...option }, {});
};
export const userPrimPostService = (option) => {
  return fetch('post', API_PATH + `add-primary-address`, { ...option }, {});
};

//* user address update service

export const userPrimeAddressUpdateService = (uId, option) => {
  return fetch('post', API_PATH + `update-primary-address/${uId}`, { ...option }, {});
};
export const usersecndAddressUpdateService = (uId, option) => {
  return fetch('post', API_PATH + `update-secondary-address/${uId}`, { ...option }, {});
};

//* user password service

export const userPasswordChangeService = (uId, email, option) => {
  return fetch('post', API_PATH + `reset-password/${uId}/${email}`, { ...option }, {});
};

//* order & checkOut

export const userOrderService = (uId) => {
  return fetch('get', API_PATH + `order/${uId}`, {}, {});
};
export const userOrderPostService = (options) => {
  return fetch('post', API_PATH + `order`, { ...options }, {});
};

export const userPaymentStatus = (options) => {
  return fetch('post', API_PATH + `add_payment`, { ...options }, {});
};
export const userDeleteAllCartItems = (id) => {
  return fetch('post', API_PATH + `delete-cart-order/${id}`, {}, {});
};

//---------------------------------------------------

export const userForgotPasswordService = (email) => {
  return fetch('post', API_PATH + `forget/password?email=${email}`, {}, {});
};

export const currencyExchangeService = () => {
  return fetch('get', `https://api.exchangerate.host/latest?/source=ecb&base=USD`, {}, {});
};

export const productSearchService = (query) => {
  return fetch('get', API_PATH + `search/product?str=${query}`, {}, {});
};
