import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AuthSlice, { AuthState } from '../../redux/auth/auth.slice';
import { LoginRequest } from '../../types/Axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';
import { LoginStyled } from './styled';

export default function index() {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const authState = useSelector<{ auth: AuthState }, AuthState>(
    (state) => state.auth,
  );

  const onFinish = (data: LoginRequest) => {
    dispatch(AuthSlice.actions.startLogin(data));
  };

  // useEffect(() => {
  //   authState.
  // }, []);

  useEffect(() => {
    if (authState.loginError) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  }, [authState.loginError]);

  useEffect(() => {
    if (authState.authenticated) navigate('/');
  }, [authState.authenticated]);

  return (
    <LoginStyled className="flex h-screen w-screen">
      <div className='left-side-container overflow-hidden'>
        <div className='poster-img-container'>
          <div className='banner-txt-container'>
            <div>Design APIs fast</div>
            <div className='mt-2'>Manage content easily.</div>
          </div>
          <img className='poster-img' src='/poster-image.png'/>
        </div>
        <div className='large-oval absolute' style={{top: 20, right: 20}} />
        <div className='small-oval absolute' style={{top: 200, right: 200}} />
        <div className='large-oval absolute' style={{left: 0, bottom: 50}} />
        <div className='small-oval absolute' style={{left: 200, bottom: -50}} />
      </div>
      <div className='right-side-container'>
        <div className='login-title'>Login to your CMS+ account</div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Typography className='input-label'>Your email:</Typography>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="example@gmail.com"
            />
          </Form.Item>
          <Typography className='input-label'>Your password:</Typography>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { type: 'string', min: 6 },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {showError ? (
            <Typography style={{ color: 'red', marginBottom: 10 }}>
              {authState.loginError}
            </Typography>
          ) : (
            <div></div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={authState.loginPending}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <a className='register-link' href="/signup">Register now</a>
      </div>
    </LoginStyled>
  );
}
