import PropTypes from 'prop-types';
import { useState } from 'react';
import { Input, Row, Col, Button, Typography, Layout } from 'antd';

import React from "react";
import { useDispatch } from 'react-redux';

import {  Login as LoginHelper } from '../utils/helper';

import { LoginOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';

const LoginButtonStyle = {
  backgroundColor: '#00c853',
  borderColor: '#00c853'
};

const { Text } = Typography;

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch();
    const login = () => {
      console.log('Trying to log in with', username, password);
      LoginHelper({username: username, password: password}, dispatch)
    }
  
    const onKeyPress = (e) => {
      if (e.charCode === 13) {
        login();
      }
    }
    return (
        <Row gutter={[0, 16]}>
        <Col span={24}></Col>
        <Col span={6} offset={9}>
          <Text strong>Username or Email</Text>
          <Input
            placeholder="Enter username or email"
            onKeyPress={onKeyPress}
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </Col>
        <Col span={6} offset={9}>
          <Text strong>Password</Text>
          <Input.Password
            placeholder="Enter password"
            onKeyPress={onKeyPress}
            value={password}
            onChange={e => setPassword(e.target.value)}
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
        </Col>
        <Col span={24} align="middle">
          <Button style={LoginButtonStyle} type="primary" shape="round" icon={<LoginOutlined />}
            onClick={login}>
            Log In
          </Button>
        </Col>
        <Col span={24} align="middle">
          <Button type="link"
            onClick={login}>
            Forgot your password?
          </Button>
          <Button type="link"
            onClick={login}>
            Don't have an account?
          </Button>
        </Col>
      </Row>
    )
}

export default Login;