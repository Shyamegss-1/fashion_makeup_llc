import { Form, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { userPasswordChangeService } from '../../../services/apiServices/apiService';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';

function ChangePassword(props) {
  const [data, setData] = useState({
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  const [Popup, setPopUp] = useState({
    show: false,
    message: 'old password cannot be empty',
    variant: 'danger',
  });
  const { id, email } = useSelector((e) => e.userLogin.userDetail);
  const setDataHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    if (data.oldPassword == null || data.oldPassword == ' ') {
      document.getElementById('oldPassword').value = '';
      setPopUp({
        show: true,
        message: 'please enter your old or current password',
        variant: 'primary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.newPassword == null || data.newPassword == ' ') {
      setPopUp({
        show: true,
        message: 'please enter your  new password',
        variant: 'primary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.confirmPassword == null || data.confirmPassword == ' ') {
      setPopUp({
        show: true,
        message: 'please  enter your confirm password',
        variant: 'primary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.newPassword !== data.confirmPassword) {
      setPopUp({
        show: true,
        message: 'new password and confirm password does not match',
        variant: 'primary',
      });
      setTimeout(() => {
        setPopUp({ ...data, show: false });
      }, 3000);
    } else if (data.oldPassword !== null || (data.oldPassword !== ' ' && data.newPassword == data.confirmPassword)) {
      const options = { old_password: data.oldPassword, new_password: data.newPassword };

      userPasswordChangeService(id, email, options).then((e) => {
        if (e.data.error == 200) {
          document.getElementById('newPassword').value = ' ';
          document.getElementById('oldPassword').value = ' ';
          document.getElementById('confirmPassword').value = ' ';
          setPopUp({
            show: true,
            message: 'your password updated successfully',
            variant: 'success',
          });
          setData({
            ...data,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
          });
          setTimeout(() => {
            setPopUp({ ...data, show: false });
            props.setpdwModal();
          }, 2500);
        } else if (e.data.error == 201) {
          document.getElementById('newPassword').value = '';
          document.getElementById('oldPassword').value = '';
          document.getElementById('confirmPassword').value = '';
          setPopUp({
            show: true,
            message: 'your old or current password is incorrect',
            variant: 'danger',
          });
          setData({
            ...data,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
          });

          setTimeout(() => {
            setPopUp({ ...data, show: false });
          }, 2500);
        } else if (e.data.error == 202) {
          document.getElementById('newPassword').value = '';
          document.getElementById('oldPassword').value = '';
          document.getElementById('confirmPassword').value = '';
          setPopUp({
            show: true,
            message: 'your details is incorrect',
            variant: 'danger',
          });
          setData({
            ...data,
            oldPassword: null,
            newPassword: null,
            confirmPassword: null,
          });
          setTimeout(() => {
            setPopUp({ ...data, show: false });
          }, 2500);
        }
      });
    }
  };

  return (
    <>
      {' '}
      {Popup.show && (
        <div className="popup-info-Alert">
          <Alert variant={Popup.variant}>{Popup.message}</Alert>
        </div>
      )}
      <div id="edt-pro_poabs">
        <p onClick={() => props.setpdwModal()} style={{ display: 'inline', float: 'right', cursor: 'pointer' }}>
          <i class="fa fa-times" aria-hidden="true"></i>
        </p>
        <div className="block-header" role="tab">
          <h6 className="text-uppercase mb-0">{'change password'}</h6>
        </div>
        <div className="block-body">
          <Form action="#">
            <Row>
              <Col md="13" className="mb-4">
                <Form.Label htmlFor="card-name">old password</Form.Label>
                <Form.Control
                  className="form-control"
                  name="oldPassword"
                  id="oldPassword"
                  onChange={(e) => {
                    setDataHandler(e);
                  }}
                  type="password"
                  placeholder="current password"
                />
              </Col>
              <Col md="13" className="mb-4">
                <Form.Label htmlFor="card-number">NEW PASSWORD</Form.Label>
                <Form.Control
                  className="form-control"
                  name="newPassword"
                  id="newPassword"
                  onChange={(e) => {
                    setDataHandler(e);
                  }}
                  type="password"
                  placeholder="New Password"
                />
              </Col>
              <Col md="13" className="mb-4">
                <Form.Label htmlFor="card-name">confirm new password</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setDataHandler(e);
                  }}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                  type="password"
                  placeholder="confirm new password"
                />
              </Col>
              <button
                style={{ margin: '16px 5px 24px 17px', width: '97px' }}
                onClick={(e) => passwordHandler(e)}
                type={'submit'}
                className="btn-next edit-btn "
              >
                save
              </button>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
