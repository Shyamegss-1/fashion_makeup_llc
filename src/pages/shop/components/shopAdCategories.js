import { Link } from 'react-router-dom';

function ShopAdComponent(props) {
  return (
    <>
      <div className="ad-block">
        {props.add.map((e) => {
          return (
            <div className="featured-add-box">
              <div className="featured-add-inner">
                {' '}
                <Link to="/shop">
                  {' '}
                  <img src="http://themesground.com/covmed/demo/V3/images/hot-trends-banner.jpg" alt="f-img" />
                </Link>
                <div className="banner-content">
                  <div className="banner-text">{e.banner_text}</div>
                  <div className="banner-text1">{e.title} </div>
                  <p>{e.content}</p>
                  <Link to="#" className="view-bnt">
                    Shop Now <i className="fa fa-chevron-circle-right"></i>
                  </Link>{' '}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ShopAdComponent;
