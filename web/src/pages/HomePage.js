import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Tabs } from 'antd';
import PostView from '../components/PostView';
import NavBar from '../components/NavBar'

import { IdcardOutlined, TeamOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetHomePagePosts as GetHomePagePostsRequest } from "../utils/helper";

const { Header, Footer, Sider, Content } = Layout;

function HomePage() {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [result, setResult] = useState('');
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   GetHomePagePostsRequest(loginState.token, dispatch)
  //     .then(posts => {
  //       setPosts(posts.data.map((post) => {
  //         return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
  //       }))
  //     })
  // }, [])

  return (
    <>

      <Layout>
        <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
        <Layout>
          <Content>
            <Row style={{ margin: "20px" }}>
                {
                  posts.length > 0 ? posts :
                    <Col span={24} align="middle" style={{ "marginTop": "50px" }}>
                      <strong>Please search communities and join the ones you are interested in. Then, you can see posts in your home page.</strong>
                    </Col>
                }
            </Row>

          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default HomePage;
