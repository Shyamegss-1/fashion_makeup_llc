import { useState } from 'react';
import Form from 'react-bootstrap/Form';

const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [modal, setModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: null,
    description: null,
    img1: null,
    img2: null,
  });

  const textFileldData = (e) => {
    setReviewData({
      ...reviewData,
      rating: rating,
      [e.target.id]: e.target.value,
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;

        resolve(baseURL);
      };
    });
  };

  const uploadHandler = (event) => {
    getBase64(event.target.files[0]).then((response) =>
      setReviewData({
        ...reviewData,
        [event.target.id]: response,
      }),
    );
  };

  return (
    <>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => {
                setRating(index);
                setModal(true);
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
      {modal && (
        <div className="star-rating_submit">
          <p onClick={() => setModal(false)}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </p>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button type="button" key={index} className={index <= (hover || rating) ? 'on' : 'off'}>
                <span className="star">&#9733;</span>
              </button>
            );
          })}
          <Form.Group className="mb-3">
            <Form.Label>review*</Form.Label>
            <Form.Control as="textarea" id="description" onChange={(e) => textFileldData(e)} rows={3} />
          </Form.Group>
          <div>
            <div class="mb-3">
              <label for="formFile" class="form-label"></label>
              <input onChange={uploadHandler} class="form-control" type="file" id="img1" />
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label"></label>
              <input onChange={uploadHandler} class="form-control" type="file" id="img2" />
            </div>
          </div>
          <button
            onClick={() => {
              setModal(false);
              props.reviewData(reviewData.rating, reviewData.description, reviewData.img1, reviewData.img2);
            }}
            className="submitreview_data"
          >
            submit
          </button>
        </div>
      )}
    </>
  );
};

export default StarRating;
