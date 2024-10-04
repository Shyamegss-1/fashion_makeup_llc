import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pageHeaderImg from '../../images/about/header-inner-bg.jpg';
import headIcon from '../../images/about/beauty-icon1.png';
import { Link } from 'react-router-dom';
import { productAboutusService } from '../../services/apiServices/apiService';
import { IMG_PATH } from '../../constants/path-constants';
import PageLoader from '../../layout/loader-page';
import 'antd/dist/antd.css';
import { Breadcrumb, Menu } from 'antd';
import { HOME } from '../../constants/route-path-constant';

function About() {
  const [apiState, setApiState] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    productAboutusService().then((e) => {
      if (e.status == 200) {
        setData(e.data.Abouts);
        setApiState(false);
      } else if (e.status !== 200) {
        setApiState(false);
      }
    });
  }, []);

  return (
    <>
      {apiState && <PageLoader />}
      <div>
        {data.map((e) => {
          return (
            <>
              {' '}
              <div className="breadCumbHead" style={{ backgroundImage: `url(${IMG_PATH + e.image})` }}>
                <Container>
                  <Row>
                    <Col>
                      <h1>About Us</h1>
                    </Col>
                  </Row>
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to={HOME}>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>About</Breadcrumb.Item>
                  </Breadcrumb>
                </Container>
              </div>
              <div className="mainAbout">
                <Container>
                  <Row>
                    <Col md={9}>
                      <div className="aboutContent">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: e.description,
                          }}
                        ></p>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default About;
