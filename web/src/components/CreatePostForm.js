import React from "react";
import { Form, Input, Button, DatePicker, Typography, Row, Col } from "antd";
import "antd/dist/antd.css";

const { Text } = Typography;

const CreatePostForm = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Col gutter={[0, 16]}>
      <Col span={24}></Col>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row>
          <Col span={8}>
            <Text style={{ paddingRight: "30px" }} strong>
              Share Event Post
            </Text>
          </Col>
          <Col span={8}>
            <Form.Item
              name="share"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Text style={{ paddingRight: "30px" }} strong>
              Event Name
            </Text>
          </Col>
          <Col span={8}>
            <Form.Item
              name="name"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Text style={{ paddingRight: "30px" }} strong>
              Event Time
            </Text>
          </Col>
          <Col span={8}>
            <Form.Item
              name="time"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <DatePicker  />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Text style={{ paddingRight: "30px" }} strong>
              Description
            </Text>
          </Col>
          <Col span={8}>
            <Form.Item
              name="description"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Text style={{ paddingRight: "30px" }} strong>
              Location
            </Text>
          </Col>
          <Col span={8}>
            <Form.Item
              name="location"
              required
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input placeholder="Enter username" />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
        <Form.Item
            wrapperCol={{
              offset: 4,
          }}
          >
            <Button type="primary" htmlType="submit" shape="round">
              Create Post
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Col>
  );
};

export default CreatePostForm;
