import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/blog/blog-banner.png';
import { Link, useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { productBlogsService } from '../../services/apiServices/apiService';
import { IMG_PATH } from '../../constants/path-constants';
import Alert from 'react-bootstrap/Alert';
import PageLoader from '../../layout/loader-page';
import { BLOG_DETAIL, HOME } from '../../constants/route-path-constant';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';

function Blog() {
  const [data, getData] = useState([]);
  const [apiState, setApiState] = useState(true);
  const [show, setShow] = useState(false);
  const params = useParams();

  useEffect(() => {
    productBlogsService().then((e) => {
      if (e.status == 200) {
        getData(e.data.blogs);
        setApiState(false);
        setTimeout(() => {
          setShow(false);
        }, 1000);
      } else if (e.status !== 200) {
        setApiState(false);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }
    });
  }, []);

  return (
    <>
      {apiState && <PageLoader />}
      {show && (
        <div className="popup-info-Alert">
          <Alert variant={'danger'}>
            oops something went wrong <b>wait</b> or <b>refresh this page</b>
          </Alert>
        </div>
      )}

      <div className="breadCumbHead" style={{ backgroundImage: `url(${pageHeaderImg})` }}>
        <Container>
          <Row>
            <Col>
              <h1>Blog</h1>
            </Col>
          </Row>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>

      <Container>
        <Row>
          {data.map(function (items) {
            return (
              <Col lg={4} md={6} className="mt-5 mb-5">
                <Card key={items.id}>
                  <Link to={BLOG_DETAIL(items.slug, items.id)}>
                    <Card.Img variant="top" className="card-image" src={IMG_PATH + items.image} />
                  </Link>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <i class="fa fa-user"></i> &nbsp; {'Admin'}
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Title>
                      <Link to={BLOG_DETAIL(items.slug, items.id)}>{items.title}</Link>
                    </Card.Title>

                    <Card.Text>{items.description.replace(/(<([^>]+)>)/gi, '').slice(0, 150) + '....'}</Card.Text>
                  </Card.Body>

                  <Card.Body id={items.id + items.title}>
                    <Link to={BLOG_DETAIL(items.slug, items.id)}>
                      <Card.Link href="#" className="blog-btn">
                        read more
                      </Card.Link>
                    </Link>
                    <Card.Link href="#" className="blog_date">
                      <i className="fa fa-calendar"></i> &nbsp; &nbsp;
                      {items.dates}
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Blog;
