import PropTypes from 'prop-types';
import { useState } from 'react';

import { Form, Input, Row, Col, Button, Typography, Space, Image } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

import { useNavigate } from 'react-router-dom'

import React from "react";
import { useDispatch } from 'react-redux';

import { Login as LoginHelper } from '../utils/helper';

import logo from '../utils/BoxyHeadlineCat.png';

import 'antd/dist/antd.css';

const { Text } = Typography;

const subButtonStyle = {
  fontSize: '12px',
  color: '#8b949e',
  cursor: 'pointer'
}

const buttonStyle = {
  backgroundColor: '#6f74dd',
  borderColor: '#6f74dd',
  color: '#ffffff',
  cursor: 'pointer',
  width: '100%',
  fontWeight: 'bold'
}

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log('Success:', values);
    LoginHelper({ username: values.username, password: values.password }, dispatch)
    navigate('/home');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const sendToRegistration = () => {
    navigate('/register');
  }

  const sendToResetPassword = () => {
    navigate('/register');
  }

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}></Col>
      <Col span={6} offset={9}>
        <Col span={24} align={'middle'} style={{ margin: '30px' }}>
          <Image src={logo} width={300} preview={false} />
        </Col>
        <Form
          style={{ marginBottom: '20px' }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Text strong>Username or Email</Text>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter your username or email.',
              },
            ]}
          >
            <Input placeholder="Enter username or email" />
          </Form.Item>

          <Text strong>Password</Text>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password.',
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Col span={24} align="middle">
            <Button type="primary" htmlType="submit" shape="round" style={buttonStyle} icon={<LoginOutlined />}>
              Login
            </Button>
          </Col>
        </Form>
        <Col span={24} align="middle">
          <Space size={'large'}>
            <Text style={subButtonStyle} onClick={sendToResetPassword}>Forgot your password?</Text>
            <Text style={subButtonStyle} onClick={sendToRegistration}>Don't have an account?</Text>
          </Space>
        </Col>
      </Col>
    </Row >
  )
}

export default Login;