import React, { useState, useEffect } from 'react';
import ReviewImgSlider from './reviewImg';

function ProductReviews(props) {
  const [showMore, setShowMore] = useState(2);
  const [readMore, setreadMore] = useState(497);
  const [reviewImg, setReviewimg] = useState(false);
  const [revImg, setrevImg] = useState('revImg');

  //* REVIEW TEXT/COMMENT
  const showMoreReviewTextHandler = (length) => {
    setreadMore(length);
  };

  //* REVIEW
  const showMoreReviewHandler = () => {
    props.data.length > 2 && showMore < props.data.length
      ? setShowMore(showMore + 1)
      : props.data?.length == showMore
      ? setShowMore(2)
      : setShowMore(showMore);
  };

  const reviewImgHandler = (img) => {
    setrevImg(img);
    setReviewimg(!reviewImg);
  };

  return (
    <>
      {reviewImg && (
        <div onClick={reviewImgHandler} className="selct_img_rvw">
          <div onClick={(e) => e.stopPropagation()} className="itemss">
            {' '}
            <ReviewImgSlider image={revImg} />
          </div>
        </div>
      )}

      {props.data?.length == 0 ? (
        <p id="no_Reviws">NO REVIEWS</p>
      ) : (
        <div className="Reviews_continer mw-100">
          {props.data
            .sort((a, b) => (a.id < b.id ? 1 : -1))
            .slice(0, showMore)
            .map((e) => {
              return (
                <div key={e.id} className="review_card">
                  <div className="w-50 mt-2 mb-3">
                    <p
                      className="review_rating "
                      style={
                        e.rating >= 3
                          ? { backgroundColor: '#26a541' }
                          : e.rating >= 2 && e.rating < 3
                          ? { backgroundColor: '#ff9f00' }
                          : { backgroundColor: '#ff6161' }
                      }
                    >
                      {e.rating} <i class="fa fa-star" aria-hidden="true"></i>
                    </p>
                  </div>
                  <div className="review_img">
                    <ul>
                      {e.img1 && e.img1 !== null ? (
                        <li onClick={() => reviewImgHandler(e.img1)}>
                          <img src={e.img1} />
                        </li>
                      ) : (
                        ' '
                      )}
                      {e.img2 && e.img2 !== null ? (
                        <li onClick={reviewImgHandler(e.img2)}>
                          <img src={e.img2} />
                        </li>
                      ) : (
                        ' '
                      )}
                    </ul>
                  </div>
                  {e.description?.length >= 497 ? (
                    <p style={{ fontSize: '14px' }}>
                      {e.description.slice(0, readMore)}
                      {e.description?.length > readMore ? '...' : ''}
                    </p>
                  ) : (
                    <p style={{ fontSize: '14px' }}>{e.description}</p>
                  )}
                  {e.description?.length > readMore ? (
                    <p onClick={() => showMoreReviewTextHandler(e.description?.length)} className="read_more">
                      READ MORE
                    </p>
                  ) : readMore !== 497 ? (
                    ''
                  ) : null}
                  <div className="user_info mt-2 d-flex justify-content-between">
                    <p>{e.username}</p>
                    <p>{e.created_at.split(' ')[0]}</p>
                  </div>
                </div>
              );
            })}
          <div onClick={() => showMoreReviewHandler()} className="showMore">
            {props.data?.length > 2 && props.data?.length !== showMore && showMore < props.data.length + 1 ? (
              <p>show more</p>
            ) : showMore == props.data?.length ? (
              <p>show less</p>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductReviews;
