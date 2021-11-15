import React from 'react';
import { Row, Col, Form, Input, Typography, Button, Radio, Select } from 'antd';

const { Text, Title } = Typography;
const { Option } = Select;

const onFinish = (values) => {
    console.log("Success: ", values);
}
const onFinishFailed = (error) => {
    console.log("Failed: ",error);
}

const CreateCommunity = (props) => {
    return ( 
        <div>
            <Row>
                <Col span={24} align="middle">
                    <Title level={2} strong="true">Create a new community</Title>
                </Col>
                <Col span={10} offset={7} align="middle">
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Text strong="true">Name</Text>
                        <Form.Item
                            name="communityName"
                            rules={[
                                {
                                    required:true,
                                    message: "Community name cannot be empty!"
                                }
                            ]}
                        > 
                            <Input placeholder="Community Name"/>
                        </Form.Item>
                        
                        <Text strong="true">Topics</Text>
                        <Form.Item
                            name="topics"
                            rules={[
                                { 
                                    required: true, message: 'Please choose at least one topic!', type: 'array' 
                                }
                            ]}
                        >
                            <Select mode="multiple">
                                <Option value="1">Topic 1</Option>
                                <Option value="2">Topic 2</Option>
                                <Option value="3">Topic 3</Option>
                            </Select>
                        </Form.Item>
                        
                        <Text strong="true">Description</Text>
                        <Form.Item
                            name="description"
                        >
                            <Input.TextArea/>
                        </Form.Item>

                        <Text strong="true">Community Type</Text>
                        <Form.Item 
                            name="communityType"
                            rules={[
                                {
                                    required:true,
                                    message: "Please choose the community type!"
                                }
                            ]}
                        >
                            <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" shape="round" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    
                    </Form>
                </Col>
            </Row>         
        </div>
     );
}
 
export default CreateCommunity;