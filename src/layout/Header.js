import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo2 from '../images/logo/image.png';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import CategoriesComponents from './components/CategoriesComponent';
import BrandComponents from './components/brandComponent';
import Cookies from 'js-cookie';
import { productCartListService } from '../services/apiServices/apiService';
import { CART } from '../constants/route-path-constant';
import { DollarCircleOutlined } from '@ant-design/icons';

function Header() {
  const dispatch = useDispatch();
  const [dropDown, openDropDown] = useState(false);
  const [data, setData] = useState([]);

  const toggleDropDown = () => {
    openDropDown(!dropDown);
  };

  const logoutHandler = () => {
    localStorage.removeItem('intercom.intercom-state-b9luj7l6');
    dispatch({ type: 'LOGOUT_REQUESTED' });
    Cookies.remove('intercom-session-b9luj7l6');
    Cookies.remove('intercom-id-b9luj7l6');
    window.location.href = process.env.NODE_ENV == 'development' ? '/' : 'https://fashionandmakeupusa.com';
    return false;
  };

  const { userDetail, token } = useSelector((e) => e.userLogin);
  const se = useSelector((e) => e.wishlistReducer.items);
  const { Currency } = useSelector((e) => e.wishlistReducer);
  const { items, totalItem } = useSelector((e) => e.cartReducer);
  useEffect(() => {
    productCartListService(userDetail.id).then((e) => {
      setData(e.data.carts);
    });
  }, [se]);
  useEffect(() => {
    productCartListService(userDetail.id).then((e) => {
      setData(e.data.carts);
    });
  }, []);

  const currencyHandler = (e) => {
    dispatch({ type: 'CURRENCT_CURRENCY', payload: e });
  };

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       includedLanguages: 'en,ar',
  //       autoDisplay: false,
  //     },
  //     'google_translate_element',
  //   );
  // };

  // useEffect(() => {
  //   var addScript = document.createElement('script');
  //   addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);
  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3" fixed="top">
          <Container fluid className="mx-5 ">
            <Navbar.Brand>
              <Link className="brand-logo" to="/">
                <img src={logo2} className="" alt="logo" width={160} />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3 m-auto">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/about_us" className="nav-link">
                    About Us
                  </Link>
                  <Link to="#" className="nav-link show-dorp">
                    brand
                    {<BrandComponents />}
                  </Link>

                  <Link to="#" className="nav-link show-dorp">
                    category
                    {<CategoriesComponents />}
                  </Link>

                  <Link to="/shop" className="nav-link">
                    ALL Products
                  </Link>

                  <Link to="/blog" className="nav-link">
                    Blog
                  </Link>

                  <Link to="/contact" className="nav-link">
                    Contact us
                  </Link>

                  <Link to={token !== null ? '/dashboard' : '/login'} className="nav-link mobileCateMEnuy">
                    {token !== null ? 'My Account' : 'Login'} &nbsp; <i class="fa fa-user-o" aria-hidden="true"></i>
                  </Link>

                  <Link to="/wishlist" className="nav-link mobileCateMEnuy">
                    Wishlist
                  </Link>

                  <Link to="/checkout" className="nav-link mobileCateMEnuy">
                    Checkout
                  </Link>

                  <Link to={CART} className="nav-link mobileCateMEnuy">
                    Cart &nbsp;
                    <Badge count={data.length + totalItem}>
                      <i class="fa fa-shopping-cart"></i>
                    </Badge>
                  </Link>

                  <a href="tel:+16237558567" className="mobileCateMEnuy">
                    &nbsp; +16237558567 &nbsp; <i class="fa fa-phone"></i>
                  </a>

                  {/* <Nav.Link href="?blog">Blog</Nav.Link> */}
                </Nav>
                <Link to={'/searchProduct'}>
                  <div className="search-page fdsdfds">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </div>
                </Link>

                <ul className="headhuhu fdsdfds">
                  <div className="Globe">
                    <GlobalOutlined style={{ fontSize: '27px' }} />
                    <i class="fa fa-sort-desc" aria-hidden="true"></i>
                  </div>
                  <div className="country_Name">
                    <li>
                      <div>
                        <a href={'https://fashionandmakeupusa.com/sa'} target="_blank">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Flag_of_Saudi_Arabia_%281938_to_1973%29.svg/2560px-Flag_of_Saudi_Arabia_%281938_to_1973%29.svg.png" />
                        </a>
                      </div>{' '}
                      <a target="_blank" rel="noopener noreferrer" href={'https://fashionandmakeupusa.com/sa'}>
                        SAUDI
                      </a>
                    </li>
                    <li>
                      <div>
                        <img src="https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg" />
                      </div>
                      USA
                    </li>
                  </div>
                </ul>

                {token !== null ? (
                  <Button className="mobileCateMEnuy" style={{ marginTop: '5px' }} onClick={() => logoutHandler()}>
                    <Link to={'/'}>LOGOUT</Link>
                  </Button>
                ) : (
                  ''
                )}

                <Nav className="other-option sdaasdsa">
                  <Link to={token !== null ? '/dashboard' : '/login'} className="nav-link">
                    <img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/20/000000/external-user-interface-kiranshastry-lineal-kiranshastry-1.png" />
                  </Link>
                  <div className="btn-call">
                    <a href="tel:+16237558567">
                      <i class="fa fa-phone"></i>
                    </a>
                  </div>
                  <Dropdown.Toggle
                    variant="none"
                    onClick={toggleDropDown}
                    id="dropdown-basic"
                    className="sdasdsada"
                    ata-backdrop="static"
                  >
                    <Link to={CART}>
                      <i class="fa fa-shopping-cart"></i>
                    </Link>
                    <div className="crt-itemNo">{data.length + totalItem}</div>
                  </Dropdown.Toggle>
                  &nbsp; &nbsp;
                  <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      <i class="fa fa-bars"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown2">
                      <Dropdown.Item href="/dashboard">
                        <Link to={'/dashboard'}>MY ACCOUNT</Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="/wishlist">
                        <Link to={'/wishlist'}>WISHLIST</Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="/checkout">
                        <Link to={'/checkout'}> CHECKOUT</Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="/blog">
                        <Link to={'/blog'}>BLOG</Link>
                      </Dropdown.Item>
                      {token !== null ? (
                        <Dropdown.Item href="/" onClick={() => logoutHandler()}>
                          <Link to={'/'}>LOGOUT</Link>
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item href="/login">
                          <Link to={'/login'}>LOGIN</Link>
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <div className="menu_currenccy" style={{ position: 'fixed', top: '150px', right: '0px', zIndex: '11111' }}>
        {' '}
        <div className={'full_currency'}>
          <li>
            <span>
              <DollarCircleOutlined style={{ fontSize: '27px' }} />
            </span>{' '}
            select your currency
          </li>
          <li
            style={Currency == 'USD' ? { backgroundColor: '#f0d0cb', color: 'black' } : null}
            onClick={() => {
              currencyHandler('USD');
            }}
          >
            <span>USD</span> United States (us) Dollar{' '}
          </li>
          <li
            style={Currency == 'SAR' ? { backgroundColor: '#f0d0cb', color: 'black' } : null}
            onClick={() => {
              currencyHandler('SAR');
            }}
          >
            <span>SAR</span> Saudi Riyal
          </li>
          <li
            style={Currency == 'AED' ? { backgroundColor: '#f0d0cb', color: 'black' } : null}
            onClick={() => {
              currencyHandler('AED');
            }}
          >
            <span>AED</span>Emirati Dirham
          </li>
          <li
            style={Currency == 'QAR' ? { backgroundColor: '#f0d0cb', color: 'black' } : null}
            onClick={() => {
              currencyHandler('QAR');
            }}
          >
            <span>QR &nbsp;</span>Qatari Riyal
          </li>
        </div>
      </div>
    </>
  );
}

export default Header;
