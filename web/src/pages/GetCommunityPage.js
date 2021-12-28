import React, { useState, useEffect } from "react";

import { Layout, Button, Col, Row, Tabs, Typography, Space, Form, message, Input, Card } from 'antd';
import { IdcardOutlined, TeamOutlined, FilterOutlined } from '@ant-design/icons';

import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import GetPostTypes from '../components/GetPostTypes';
import PostView from '../components/PostView';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";
import { GetCommunityPosts as GetCommunityPostsRequest } from "../utils/helper";
import { SearchCommunityPosts as SearchCommunityPostsRequest } from "../utils/helper";
import CommunityModeration from "../components/CommunityModeration";

const { Text, Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const { TabPane } = Tabs;

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
  const [filters, setFilters] = useState({});
  const [postTypes, setPostTypes] = useState(<></>);


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
    if (id) {
      setPostTypes(
        <>
          <Col span={24}>
            <Text><b>Filter by Post Type</b></Text>
          </Col>
          <GetPostTypes id={id} onSelectPostType={(selectedId) => { setFilters({ ...filters, postTypeId: selectedId }) }} />
        </>
      )
    }
  }, [id])

  const onFilter = async (values) => {
    try {
      let body = { communityId: id }
      if (values.tag) body.tag = values.tag;
      if (filters.postTypeId) body.postTypeId = filters.postTypeId;
      if (!body.postTypeId && !body.tag) {
        GetCommunityPostsRequest({ id: id, token: loginState.token }, dispatch)
        .then(posts => {
          setPosts(posts.data.map((post) => {
            return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
          }))
        })
        message.success('All posts returned');
        return
      }
      let posts = await SearchCommunityPostsRequest(body, loginState.token, dispatch);
      if (!posts.data || posts.data.length < 1) {
        message.warning('No posts found for given filters');
        return
      }
      setPosts(posts.data.map((post) => {
        return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
      }))
      message.success('Posts filtered');
    } catch (err) {
      message.error('An error occured whie filtering');
    }
  }

  const onFilterFailed = async () => {
    message.error('An error occured whie filtering');
  }

  return (
    <div key={id}>
      <Layout>
        <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
        <Layout>
          <Content>
            <Row>
              <Col span={5} align="right">
                {
                  result && <AboutCommunity image={result.iconUrl ? result.iconUrl : ''} name={result.name} description={result.description} members={result.members} moderators={result.moderators}
                    isMember={result.isMember} isModerator={result.isModerator} isPrivate={result.isPrivate} creator={result.user} communityId={id}
                  />
                }
              </Col>
              <Col span={19}>
                <div style={{ margin: "20px" }}>
                  <Tabs defaultActiveKey="1" type="card">
                    {result.isMember || !result.isPrivate ?
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
                    {result.isMember || !result.isPrivate ?
                      <TabPane
                        tab={
                          <span>
                            <FilterOutlined />
                            <b>Filter</b>
                          </span>
                        }
                        key="2"
                      >
                        {
                          <Card style={postCardStyle}>
                            <Col offset={6} span={12} align="middle">
                              {postTypes}
                            </Col>

                            <Form
                              name="basic"
                              onFinish={onFilter}
                              onFinishFailed={onFilterFailed}
                            >
                              <Form.Item
                                name="tag">
                                <Col offset={6} span={12} align="middle">
                                  <Text><b>Filter by Tag</b></Text>
                                  <Input placeholder="Tag" />
                                </Col>
                              </Form.Item>
                              <Form.Item>
                                <Col offset={6} span={12} align="middle">
                                  <Button style={buttonStyle} icon={<FilterOutlined />} type="primary" shape="round" htmlType="submit">
                                    Filter
                                  </Button>
                                </Col>
                              </Form.Item>
                            </Form>
                          </Card>

                        }
                      </TabPane> : <></>}
                    {result.isModerator ?
                      <TabPane
                        tab={
                          <span>
                            <TeamOutlined />
                            <b>Moderation</b>
                          </span>
                        }
                        key="3"
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