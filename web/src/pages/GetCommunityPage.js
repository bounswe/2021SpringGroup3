import React, { useState, useEffect } from "react";

import { Layout, Col, Row, Tabs } from 'antd';
import { IdcardOutlined, TeamOutlined } from '@ant-design/icons';

import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import PostView from '../components/PostView';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";
import { GetCommunityPosts as GetCommunityPostsRequest } from "../utils/helper";
import CommunityModeration from "../components/CommunityModeration";

const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function GetCommunityPage(props) {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [result, setResult] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    GetCommunityPageRequest({ id: id, token: loginState.token }, dispatch)
      .then(result => {
        setResult(result.data);
      })
    GetCommunityPostsRequest({ id: id, token: loginState.token }, dispatch)
      .then(posts => {
        setPosts(posts.data.map((post) => {
          return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
        }))
      })
  }, [id])

  return (
    <div key={id}>
      <Layout>
        <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
        <Layout>
          <Content>
            <Row>
              <Col span={5} align="right">
                <AboutCommunity image={result.iconUrl ? result.iconUrl : ''} name={result.name} description={result.description} members={result.members} moderators={result.moderators}
                  isMember={result.isMember} isModerator={result.isModerator} isPrivate={result.isPrivate} creator={result.user} communityId={id}
                  />
              </Col>
              <Col span={19}>
                <div style={{margin: "20px"}}>
                <Tabs defaultActiveKey="1"  type="card">
                  { result.isMember || !result.isPrivate ?
                  <TabPane
                    tab={
                      <span>
                        <IdcardOutlined />
                        <b>Posts</b>
                      </span>
                    }
                    key="1"
                  >
                    {posts}
                  </TabPane> : <></>}
                  { result.isModerator ?
                    <TabPane
                    tab={
                      <span>
                        <TeamOutlined />
                        <b>Moderation</b>
                      </span>
                    }
                    key="2"
                  >
                    <CommunityModeration pendingMembers={result.pendingMembers} pendingModerators={result.pendingModerators} 
                      communityId={id} members={result.members} moderators={result.moderators} name={result.name} />
                  </TabPane> : <></>}
                </Tabs>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </div>
  );
}

export default GetCommunityPage;