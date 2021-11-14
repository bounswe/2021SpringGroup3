import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Switch, DatePicker, Upload, Avatar, Divider } from 'antd';
import 'antd/dist/antd.css';

import { TeamOutlined, LockOutlined, SaveOutlined, UserOutlined, CheckOutlined, CloseOutlined} from '@ant-design/icons';

const { Text, Title } = Typography;
const { TextArea } = Input;

const ProfileEdit = (props) => {

  console.log(props)

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}></Col>
      <Col span={12} offset={6}>
        <Row>
          <Col span={12}>
            <Title level={4}>Profile Settings</Title>
          </Col>
          <Col span={11} offset={1}>
            <Title level={4}>Privacy Settings</Title>
          </Col>
        </Row>

        <Form
          name="basic"
          initialValues={
            props.userObj
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

          <Text strong>Profile Picture</Text>
          <Row>
            <Col span={12}>
              <Form.Item name="profilePicture">
                <Avatar size={64} icon={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isProfilePicturePublic" valuePropName="checked">
                <Switch
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>


          <Col span={12}>
            <Text strong>Username</Text>
            <Form.Item
              name="username"
              required
              rules={[
                {
                  required: true,
                  message: 'Please enter your username',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Text strong>Bio</Text>
          <Row>
            <Col span={12}>
              <Form.Item name="bio">
                <TextArea rows={4} placeholder="Enter bio" />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isBioPublic" valuePropName="checked">
                <Switch
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>


          <Text strong>Birthday</Text>
          <Row>
            <Col span={12}>
              <Form.Item name="birthday">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isBirthdayPublic" valuePropName="checked">
                <Switch
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Text strong>Location</Text>
          <Row>
            <Col span={12}>
              <Form.Item name="location">
                <Input placeholder="Enter location" />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isLocationPublic" valuePropName="checked">
                <Switch
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Text>Other users must send me a request to follow my profile</Text>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isProfilePublic" valuePropName="checked">
                <Switch
                  checkedChildren={<CheckOutlined  />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>



          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round" icon={<SaveOutlined />}>
              Save Profile
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default ProfileEdit;