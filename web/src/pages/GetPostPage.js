import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Layout, Col, Row, Form, Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

import NavBar from '../components/NavBar';
import PostView from '../components/PostView';
import CommentView from '../components/CommentView';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetPostPage as GetPostPageRequest, PostComment, PostComment as PostCommentRequest } from "../utils/helper";

const { Header, Footer, Sider, Content } = Layout;

const buttonStyle = {
  backgroundColor: '#6f74dd',
  borderColor: '#6f74dd',
  color: '#ffffff',
  cursor: 'pointer',
  marginTop: '3px',
  marginBottom: '6px'
}

function GetPostPage(props) {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { postId, communityId } = useParams();

  const [result, setResult] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    GetPostPageRequest({ postId: postId, communityId: communityId, token: loginState.token }, dispatch)
      .then(result => {
        setResult(<PostView postObj={result.data} />);
        setComments(Object.values(result.data.comments).map(currentComment => (
          <CommentView comment={currentComment} />
        )));
      });
  }, [])

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);

    const body = {
      text: values.comment
    }
    PostCommentRequest({ postId: postId }, body, loginState.token);
    GetPostPageRequest({ postId: postId, communityId: communityId, token: loginState.token }, dispatch)
      .then(result => {
        setResult(<PostView postObj={result.data} />);
        setComments(Object.values(result.data.comments).map(currentComment => (
          <CommentView comment={currentComment} />
        )));
      });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
        <Layout>
          <Content>
            <Row>
              <Col offset={3} span={18} style={{ marginTop: '30px' }}>
                {result}
              </Col>
              <Col offset={3} span={18}>
                {comments}
              </Col>
              <Col offset={3} span={18} style={{ marginTop: "10px" }}>
                <Form
                  form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{ marginBottom: '10px' }}
                    name="comment"
                    rules={[{ required: true, message: 'Please input comment' }]}
                  >
                    <Input.TextArea style={{ width: "100%", borderRadius: "20px" }} placeholder="Enter Comment" />
                  </Form.Item>

                  <Form.Item>
                    <Col span={24} align="middle">
                      <Button shape="round" type="primary" htmlType="submit" style={buttonStyle} icon={<SendOutlined />}>
                        Send Comment
                      </Button>
                    </Col>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default GetPostPage;