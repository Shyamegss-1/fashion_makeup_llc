import { Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function ShipAddress(props) {
  return (
    <>
      {props.modalState ? (
        <div className="billing_Address">
          <div className="B_add-block checkoutaddres">
            <div className="useraddres">
              <i class="fa fa-user"></i>
            </div>
            <div className="content-address">
              <h4>
                {props.addType} &nbsp;{' '}
                <span>
                  {' '}
                  <i class="fa fa-check"></i>
                </span>
              </h4>
              <p>
                {props.addressFields.fname} <span>+{props.addressFields.phone}</span>
              </p>
            </div>

            <div className="change-address">
              <button onClick={() => props.hideModal1(!props.modal1)} className="btn-next btn-edt">
                {!props.modal1 ? 'edit' : 'close'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => props.hideModal1(!props.modal1)} className="btn-next edit-btn adddr">
          {!props.modal1 ? ' Add primary Address' : 'close'}
        </button>
      )}

      {props.modal1 && (
        <>
          <div className="block-header" role="tab">
            <h6 className="text-uppercase mb-0">{props.addType}</h6>
          </div>
          <div className="block-body">
            <Form action="#">
              <Row>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-name">Full name</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="text"
                    placeholder="user name"
                    id="fname"
                    value={props.addressFields.fname}
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-number">email address</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="email"
                    placeholder="user.@gmail.com"
                    id="email"
                    value={props.addressFields.email}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-name">STREET</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="text"
                    placeholder="123 main st."
                    id="street"
                    value={props.addressFields.street}
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-number">City</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="text"
                    placeholder="City"
                    id="city"
                    value={props.addressFields.city}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-name">zip code</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="number"
                    placeholder="postal code"
                    id="zip"
                    value={props.addressFields.zip}
                  />
                </Col>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-number">state</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="text"
                    placeholder="State"
                    id="state"
                    value={props.addressFields.state}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="card-name">Phone No</Form.Label>
                  <Form.Control
                    onChange={(e) => props.fieldHandler(e)}
                    className="form-control"
                    type="text"
                    placeholder="phone no"
                    id="phone"
                    value={props.addressFields.phone}
                  />
                </Col>
              </Row>
            </Form>
            <button
              style={{ margin: '16px 5px 24px 0px' }}
              type={'submit'}
              onClick={props.savePostHandler}
              className="btn-next edit-btn "
            >
              save
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ShipAddress;
