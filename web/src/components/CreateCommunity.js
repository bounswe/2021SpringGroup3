import React from 'react';
import { Row, Col, Form, Input, Typography, Button, Radio, Select, Card} from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreateCommunity as CreateCommunityRequest } from '../utils/helper';

const { Text, Title } = Typography;
const { Option } = Select;


const CreateCommunity = (props) => {
    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        console.log("Success: ", values);
        
        const id = await CreateCommunityRequest({name: values.communityName, token: loginState.token}, dispatch);
        navigate(`/communities/${id}`)
    }
    const onFinishFailed = (error) => {
        console.log("Failed: ",error);
    }

    const postCardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
      }

    return ( 
        <Card size="small" style={postCardStyle}>
            <Row>
                <Col span={24} align="middle">
                    <Title level={2} strong="true">Create a New Community</Title>
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
        </Card>
     );
}
 
export default CreateCommunity;