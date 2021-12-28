import React from 'react';
import { Row, Col, Form, Input, Button, Select, Space, Card, Typography, notification, message } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreatePostType as CreatePostTypeRequest } from '../utils/helper';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const types = [
  { label: 'text', value: 'text' },
  { label: 'number', value: 'number' },
  { label: 'link', value: 'link' },
  { label: 'date', value: 'date' },
  { label: 'location', value: 'location' },
];

const CreatePostType = (props) => {

  const buttonStyle = {
    backgroundColor: '#6f74dd',
    borderColor: '#6f74dd',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '3px',
    marginBottom: '3px',
    fontWeight: 'bold'
  }

  const postCardStyle = {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '20px'
  }

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    values.communityId = props.id;

    if (!values.fields || values.fields.length < 1) {
      navigate(`/createPostType`, { state: { id: props.id, communityName: props.communityName } })
      return
    }

    console.log('Received values of form:', values);
    values.textFieldNames = values.fields.filter(field => field.type == 'text').map(item => { return item.name })
    values.numberFieldNames = values.fields.filter(field => field.type == 'number').map(item => { return item.name })
    values.linkFieldNames = values.fields.filter(field => field.type == 'link').map(item => { return item.name })
    values.locationFieldNames = values.fields.filter(field => field.type == 'date').map(item => { return item.name })
    values.dateFieldNames = values.fields.filter(field => field.type == 'location').map(item => { return item.name })

    delete values.fields;

    const response = await CreatePostTypeRequest(values, loginState.token, dispatch);
    if (response.status == 201) {
      navigate(`/communities/${response.data.community.id}`);
      notification.success({
        message: `Post Type Created.`,
    });
    } else {
      message.error('An error occured');
    }

  }


  return (
    <Card size="small" style={postCardStyle}>
      <Row>
        <Col span={24} align="middle">
          <Title level={2} strong="true">Create a New Post Type for {props.communityName}</Title>
        </Col>
        <Col span={10} offset={7} align="middle" style={{ marginTop: '20px' }}>

          <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Text><b>Post Type Name</b></Text>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Post type name cannot be empty!"
                }
              ]}
            >
              <Input placeholder="Post type name" size='middle' />
            </Form.Item>
            <Form.List name="fields">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Col span={24} align="middle">
                      <Row key={key}>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'type']}
                            fieldKey={[fieldKey, 'type']}
                            rules={[{ required: true, message: 'Missing type' }]}
                          >

                            <Select options={types}></Select>


                          </Form.Item>
                        </Col>
                        <Col span={17}>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            fieldKey={[fieldKey, 'name']}
                            rules={[{ required: true, message: 'Missing field name' }]}
                          >
                            <Input placeholder="Field name" />
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                          </Col>
                        
                      </Row>
                    </Col>
                  ))}
                  <Form.Item>
                    <Col span={24} align="middle">
                      <Button type="dashed" shape="round" onClick={() => add()} icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Col>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item >
              <Col span={24} align="middle">
                <Button style={buttonStyle} type="primary" shape="round" htmlType="submit">
                  Submit Post Type
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default CreatePostType;