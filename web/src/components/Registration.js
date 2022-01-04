import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Image } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { useDispatch } from 'react-redux';
import { Register } from '../utils/helper';
import { useNavigate } from 'react-router-dom'

import logo from '../utils/BoxyHeadlineCat.png';

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

const Registration = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Success:', values);
    Register(values, dispatch)
    navigate('/login')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}></Col>
      <Col span={6} offset={9}>
        <Col span={24} align={'middle'} style={{ margin: '30px' }}>
          <Image src={logo} width={300} preview={false} />
        </Col>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Text strong>Username</Text>
          <Form.Item
            name="username"
            required
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Text strong>Email</Text>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your e-mail!',
              },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Text strong>Password</Text>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Text strong>Password </Text>
          <Form.Item
            name="passwordSecond"
            rules={[
              {
                required: true,
                message: 'Please input your password again!',
              },
            ]}
          >
            <Input.Password placeholder="Enter password again" />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            required
          >
            <Checkbox required><a href="##">Accepting the terms of GPDR and KVKK</a></Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round" style={buttonStyle} icon={<FormOutlined />}>
              Register
            </Button>
          </Form.Item>
        </Form>
        <Col span={24} align="middle">
          <Text style={subButtonStyle} onClick={() => navigate('/login')}>Already have an account?</Text>
        </Col>
      </Col>
    </Row>
  );
}

export default Registration;