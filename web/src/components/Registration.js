import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col } from 'antd';
import 'antd/dist/antd.css';

import { useDispatch } from 'react-redux';
import { Register } from '../utils/helper';
import { useNavigate } from 'react-router-dom'

const {Text} = Typography;

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

          <Form.Item
            wrapperCol={{
              offset: 4,
          }}
          >
            <Button type="primary" htmlType="submit" shape="round">
              Submit Registration Form
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default Registration;