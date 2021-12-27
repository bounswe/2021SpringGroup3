import { useState, React } from 'react';
import { Row, Col, Form, Input, Typography, Button, Radio, Select, Card, Upload, message, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreateCommunity as CreateCommunityRequest } from '../utils/helper';

const { Text, Title } = Typography;
const { Option } = Select;


const CreateCommunity = (props) => {

    const buttonStyle = {
        backgroundColor: '#6f74dd',
        borderColor: '#6f74dd',
        color: '#ffffff',
        cursor: 'pointer',
        marginTop: '3px',
        marginBottom: '3px',
        fontWeight: 'bold'
    }

    const cancelButtonStyle = {
        backgroundColor: '#ffffff',
        borderColor: '#6f74dd',
        color: '#6f74dd',
        cursor: 'pointer',
        marginTop: '3px',
        marginBottom: '3px'
    }

    const postCardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isPrivate, setIsPrivate] = useState(false);

    const onFinish = async (values) => {
        let communityBody = {}
        communityBody.iconUrl = values.iconUrl;
        communityBody.name = values.communityName;
        communityBody.description = values.description;
        communityBody.isPrivate = isPrivate;
        const id = await CreateCommunityRequest(communityBody, loginState.token, dispatch);
        console.log(id)
        if (id && id.length > 0) {
            navigate(`/communities/${id}`)
            notification.success({
                message: `Community Created.`,
            });
        } else {
            notification.error({
                message: `An error occured.`,
            });
        }
    }

    const onFinishFailed = (error) => {
        console.log("Failed: ", error);
    }

    return (
        <Card size="small" style={postCardStyle}>
            <Row>
                <Col span={24} align="middle">
                    <Title level={2} strong="true">Create a New Community</Title>
                </Col>
                <Col span={10} offset={7} align="middle" style={{ marginTop: '20px' }}>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Text><b>Name</b></Text>
                        <Form.Item
                            name="communityName"
                            rules={[
                                {
                                    required: true,
                                    message: "Community name cannot be empty!"
                                },
                                {
                                    min: 2,
                                    message: "Community name should be at least 2 characters."
                                }
                            ]}
                        >
                            <Input placeholder="Community Name" />
                        </Form.Item>

                        <Text><b>Description</b></Text>
                        <Form.Item
                            name="description"
                        >
                            <Input.TextArea placeholder="Community Description" />
                        </Form.Item>

                        <Text><b>Icon URL</b></Text>
                        <Form.Item
                            name="iconUrl"
                        >
                            <Input placeholder="Community Icon URL" />
                        </Form.Item>
                        <Text><b>Privacy Type</b></Text>
                        <Form.Item
                            name="communityType"
                        >
                            <Radio.Group>
                                <Radio.Button value="public" buttonStyle="solid" onChange={() => setIsPrivate(!isPrivate)} style={!isPrivate ? buttonStyle : cancelButtonStyle}>Public</Radio.Button>
                                <Radio.Button value="private" buttonStyle="solid" onChange={() => setIsPrivate(!isPrivate)} style={isPrivate ? buttonStyle : cancelButtonStyle}>Private</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" shape="round" htmlType="submit" style={buttonStyle}>
                                Submit Community
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </Card>
    );
}

export default CreateCommunity;