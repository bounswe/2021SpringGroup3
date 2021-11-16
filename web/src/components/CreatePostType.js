import React from 'react';
import { Row, Col, Form, Input, Typography, Button, Radio, Select, Space } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreatePostType as CreatePostTypeRequest } from '../utils/helper';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const types = [
  { label: 'text', value: 'text' },
  { label: 'number', value: 'number' },
  { label: 'link', value: 'link' },
  { label: 'date', value: 'date' },
  { label: 'lacation', value: 'location' },
];

const CreatePostType = (props) => {
  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  const onFinish = async (values) => {

    values.communityId = props.id;

    console.log('Received values of form:', values);
    values.textFieldNames = values.fields.filter(field => field.type == 'text').map(item => { return item.name })
    values.numberFieldNames = values.fields.filter(field => field.type == 'number').map(item => { return item.name })
    values.linkFieldNames = values.fields.filter(field => field.type == 'link').map(item => { return item.name })
    values.locationFieldNames = values.fields.filter(field => field.type == 'date').map(item => { return item.name })
    values.dateFieldNames = values.fields.filter(field => field.type == 'location').map(item => { return item.name })

    delete values.fields;

    await CreatePostTypeRequest(values, loginState.token, dispatch);
    navigate(`/communities/`)
  }


  return (
    <Row>
      <Col offset={6} span={12} style={{marginTop: "20px"}}>
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          <label>Post Type Name</label>
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
                    <Space key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, 'type']}
                        fieldKey={[fieldKey, 'type']}
                        rules={[{ required: true, message: 'Missing type' }]}
                      >
                        <Select options={types} style={{ width: 120 }}></Select>
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        fieldKey={[fieldKey, 'name']}
                        rules={[{ required: true, message: 'Missing field name' }]}
                      >
                        <Input placeholder="Field name"/>
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
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
              <Button type="primary" shape="round" htmlType="submit">
                Create Post Type
              </Button>
            </Col>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default CreatePostType;