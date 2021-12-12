import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Layout, Col, Row } from 'antd';
import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import PostView from '../components/PostView';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";
import { GetCommunityPosts as GetCommunityPostsRequest } from "../utils/helper";

const { Header, Footer, Sider, Content } = Layout;

function GetCommunityPage(props) {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams();

  const [result, setResult] = useState('');

  const [posts, setPosts] = useState('');

  useEffect(() => {
    GetCommunityPageRequest({ id: id, token: loginState.token }, dispatch)
      .then(result => setResult(result.data.name));
  }, [])

  useEffect(() => {
    GetCommunityPostsRequest({ id: id, token: loginState.token }, dispatch)
      .then(posts => {
        setPosts(posts.data.map((post) => {
          return <div style={{margin: '20px'}}><PostView postObj={post} /></div>
        }))
      })
  }, [])

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
        <Layout>
          <Content>
            <Row>
              <Col span={5}>
                <AboutCommunity description={result} members="123 (placeholder)" created="16.11.2021 (placeholder)" communityID={id} />
              </Col>
              <Col span={19}>
                  {posts}
              </Col>
            </Row>  
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default GetCommunityPage;