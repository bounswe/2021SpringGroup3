import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Layout, Col, Row } from 'antd';
import NavBar from '../components/NavBar';
import PostView from '../components/PostView';
import CommentView from '../components/CommentView';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetPostPage as GetPostPageRequest } from "../utils/helper";

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
              <Col>
                    Comment Form Here
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