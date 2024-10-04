import { Link } from 'react-router-dom';

function LoginPop(props) {
  return (
    <>
      <div onClick={props.closeModal} className="popup_login coustom_popup">
        <div className="inner_popup">
          <div className="ad-block">
            <div className="featured-add-box">
              <div className="featured-add-inner">
                {' '}
                <Link to={'/Login'}>
                  {' '}
                  <img src="http://themesground.com/covmed/demo/V3/images/hot-trends-banner.jpg" alt="f-img" />
                </Link>
                <div className="banner-content">
                  <div className="banner-text">Clearance Sale</div>
                  <div className="banner-text1">
                    Hot <span>Sale</span>{' '}
                  </div>
                  <p>Get upto 20% off</p>
                  <Link style={{ fonttSize: '30px' }} to={'#'}>
                    login <i className="fa fa-chevron-circle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPop;
