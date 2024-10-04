import React from 'react';
import {
  HOME,
  ABOUT_US,
  SHOP,
  BLOGS,
  CONTACT,
  LOGIN,
  SIGN_UP,
  DASHBOARD,
  CART,
  CHECKOUT,
  WISHLIST,
  FORGOTPASSWORD,
  SEARCH_PRODUCT,
} from '../constants/route-path-constant';

const NoPageFound = React.lazy(() => import('./nowhere'));
const Home = React.lazy(() => import('../pages/home/Home'));
const About = React.lazy(() => import('../pages/aboutUs/About'));
const Shop = React.lazy(() => import('../pages/shop/Shop'));
const ProductDetails = React.lazy(() => import('../pages/shop/productDetails/ProductDetails'));
const Contact = React.lazy(() => import('../pages/contact/Contact'));
const Blog = React.lazy(() => import('../pages/blog/Blog'));
const Blog_detail = React.lazy(() => import('../pages/blog/Blog_detail'));
const Login = React.lazy(() => import('../pages/user/Login'));
const Signup = React.lazy(() => import('../pages/user/Signup'));
const Cart = React.lazy(() => import('../pages/cart/cart'));
const UserDetail = React.lazy(() => import('../pages/user/userDetail'));
const Usercheckout = React.lazy(() => import('../pages/checkout.js/checkout'));
const Wishlist = React.lazy(() => import('../pages/wishlist/index'));
const BrandProd = React.lazy(() => import('../pages/shop/productBrand'));
const CategoryProd = React.lazy(() => import('../pages/shop/productCategories'));
const SearchProduct = React.lazy(() => import('../pages/shop/productSearch'));
const Lodingtest = React.lazy(() => import('../loadertesting'));
const ForgotPassword = React.lazy(() => import('../pages/user/forgotPassword'));

const configureRoutes = () => {
  const routes = [
    {
      element: <Home />,
      exact: true,
      path: HOME,
      title: 'home page',
      type: 'public',
    },
    {
      element: <NoPageFound />,
      exact: true,
      path: '*',
      title: '404 Not Found',
      type: 'public',
    },
    {
      element: <About />,
      exact: true,
      path: ABOUT_US,
      title: 'About page',
      type: 'public',
    },
    {
      element: <Shop />,
      exact: true,
      path: SHOP,
      title: 'shop page',
      type: 'public',
    },
    {
      element: <ProductDetails />,
      exact: true,
      path: '/product/:pname/:pid',
      title: 'shop page',
      type: 'public',
    },
    {
      element: <Contact />,
      exact: true,
      path: CONTACT,
      title: 'shop page',
      type: 'public',
    },
    {
      element: <Blog />,
      exact: false,
      path: BLOGS,
      title: 'blog page',
      type: 'public',
    },
    {
      element: <Blog_detail />,
      exact: true,
      path: '/blog_detail/:title/:id',
      title: 'blog detail page',
      type: 'public',
    },
    {
      element: <Login />,
      exact: true,
      path: LOGIN,
      title: 'login page',
      type: 'public',
    },
    {
      element: <Signup />,
      exact: true,
      path: SIGN_UP,
      title: 'signup page',
      type: 'public',
    },
    {
      element: <Cart />,
      exact: true,
      path: CART,
      title: 'cart page',
      type: 'public',
    },
    {
      element: <UserDetail />,
      exact: true,
      path: DASHBOARD,
      title: 'userDetail page',
      type: 'private',
    },
    {
      element: <Usercheckout />,
      exact: true,
      path: CHECKOUT,
      title: 'checkout page',
      type: 'private',
    },
    {
      element: <Wishlist />,
      exact: true,
      path: WISHLIST,
      title: 'wishlist page',
      type: 'public',
    },
    {
      element: <BrandProd />,
      exact: true,
      path: '/brand/:bname',
      title: 'product brand page',
      type: 'public',
    },
    {
      element: <CategoryProd />,
      exact: true,
      path: '/category/:Pcate',
      title: 'product category page',
      type: 'public',
    },
    {
      element: <Lodingtest />,
      exact: true,
      path: '/test',
      title: 'testing page',
      type: 'public',
    },
    {
      element: <ForgotPassword />,
      exact: true,
      path: FORGOTPASSWORD,
      title: 'forgotpassword page',
      type: 'public',
    },
    {
      element: <SearchProduct />,
      exact: true,
      path: SEARCH_PRODUCT,
      title: 'search product page',
      type: 'public',
    },
  ];

  return routes;
};

export default configureRoutes;
