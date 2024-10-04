import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from 'react-router-dom';
import { IMG_PATH } from '../../constants/path-constants';
import { productBlogsService } from '../../services/apiServices/apiService';
import Alert from 'react-bootstrap/Alert';
import HelmetMeta from '../../services/meta-helmet';
import PageLoader from '../../layout/loader-page';
import { BLOGS, BLOG_DETAIL, HOME } from '../../constants/route-path-constant';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';

function Blog_detail() {
  const [apiState, setApiState] = useState(true);
  const [content, getContent] = useState([]);
  const [show, setShow] = useState(false);
  const params = useParams();

  useEffect(() => {
    productBlogsService().then((e) => {
      if (e.status == 200) {
        setApiState(false);
        getContent(e.data.blogs);
      } else if (e.status !== 200) {
        setApiState(false);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }
    });
  }, [params.id]);

  return (
    <>
      {show && (
        <div className="popup-info-Alert">
          <Alert variant={'danger'}>
            oops something went wrong <b>wait</b> or <b>refresh this page</b>
          </Alert>
        </div>
      )}
      {apiState && <PageLoader />}
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
            <Breadcrumb.Item>
              <Link to={BLOGS}>Blog</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{params.title.replaceAll('-', ' ')}</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </div>
      <Container>
        <Row>
          {content
            .filter((e) => e.id == params.id)
            .map((e) => {
              return (
                <>
                  <HelmetMeta title={e.meta_title} keyword={e.meta_keyword} discription={e.meta_description} />
                  <Col lg="9" className="mt-5 mb-5">
                    <Card key={e.id}>
                      <Card.Img variant="top" src={IMG_PATH + e.image} />
                      <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                          {' '}
                          <i className="fa fa-user"></i> &nbsp; Admin
                        </ListGroup.Item>
                      </ListGroup>
                      <Card.Body>
                        <Card.Text>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: e.description,
                            }}
                          ></div>
                        </Card.Text>
                      </Card.Body>
                      <Card.Body>
                        <Card.Link href="#" className="blog_date">
                          <i className="fa fa-calendar"></i> &nbsp; &nbsp;{e.dates}{' '}
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </>
              );
            })}

          <Col lg="3" className="mt-5 g-5 blog-details">
            <Card>
              <Card.Header className="recent_post">Recent Posts</Card.Header>
              {content
                .filter((e) => e.id != params.id)
                .map((e) => {
                  return (
                    <Row className="p-3">
                      <Col className="text-center" md="5">
                        <Link to={BLOG_DETAIL(e.slug, e.id)}>
                          <img src={IMG_PATH + e.image} className="small-img" />
                        </Link>
                      </Col>
                      <Col className="" md="7">
                        <Link to={BLOG_DETAIL(e.slug, e.id)}>
                          {' '}
                          <h5 style={{ color: '#0a200f', fontSize: '15px', fontWeight: '600' }}>{e.title}</h5>
                        </Link>
                      </Col>
                    </Row>
                  );
                })}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Blog_detail;
