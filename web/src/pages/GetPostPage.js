import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Layout, Col, Row, Form, Input, Button } from 'antd';
import NavBar from '../components/NavBar';
import PostView from '../components/PostView';
import CommentView from '../components/CommentView';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetPostPage as GetPostPageRequest, PostComment, PostComment as PostCommentRequest } from "../utils/helper";

const { Header, Footer, Sider, Content } = Layout;

function GetPostPage(props) {

  let post = <></>;

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { postId, communityId } = useParams();

  const [result, setResult] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    GetPostPageRequest({ postId: postId, communityId: communityId, token: loginState.token }, dispatch)
      .then(result => {
        setResult(<PostView postObj={result.data}/>);
        setComments(result.data.comments);
    });
  }, [])

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);

    const body = {
      text: values.comment
    }
    
    PostCommentRequest({postId:postId},body,loginState.token);
    GetPostPageRequest({ postId: postId, communityId: communityId, token: loginState.token }, dispatch)
    .then(result => {
      setResult(<PostView postObj={result.data}/>);
      setComments(result.data.comments);
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
              <Col offset={1} span={21} style={{marginTop: '30px'}}>
                  {result}
              </Col>
              <Col span={24}>
                  {Object.values(comments).map( currentComment => (
                    <CommentView comment={currentComment}/>
                  ))}
              </Col>
              <Col offset={1} span={21}>
                <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[{ required: true, message: 'Please enter a comment!' }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                    <Button type="primary" htmlType="submit">
                      Send Comment
                    </Button>
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