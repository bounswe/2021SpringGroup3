import React, { useState, useEffect } from "react";

import { Layout, Button, Col, Row, Tabs, Typography, Space, Form, message, Input, Card, AutoComplete, Avatar, Radio } from 'antd';
import { IdcardOutlined, TeamOutlined, LockOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';

import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import GetPostTypes from '../components/GetPostTypes';
import PostView from '../components/PostView';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";
import { GetCommunityPosts as GetCommunityPostsRequest } from "../utils/helper";
import { SearchCommunityPosts as SearchCommunityPostsRequest } from "../utils/helper";
import { SearchUsers as SearchMembersRequest } from "../utils/helper";
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
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [sortIndex, setSortIndex] = useState(0);


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
      if (values.sortBy) body.sortBy = values.sortBy;
      if (filters.postTypeId) body.postTypeId = filters.postTypeId;
      if (!body.postTypeId && !body.tag) {
        GetCommunityPostsRequest({ id: id, sortBy: values.sortBy, token: loginState.token }, dispatch)
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

  const searchMember = async (value) => {
    if (!value) {
      setSearchedMembers([]);
      return;
    }
    let resultMembers = await SearchMembersRequest({ query: value, communityId: id }, loginState.token, dispatch);
    setSearchedMembers(resultMembers.data)
  }

  const onFilterFailed = async () => {
    message.error('An error occured whie filtering');
  }

  const renderTitle = (title) => (
    <span>
      {title}
    </span>
  );

  const renderMember = (user) => ({
    value: (<Col key={user.id} span={24} style={{ cursor: 'pointer', marginBottom: '5px', marginTop: '5px' }} onClick={() => navigate(`/profiles/${user.id}`)}>
      <Space size='middle'>
        <Avatar size={40} src={user.profilePhotoUrl.value} />
        <Space direction='vertical' size='0px'>
          <Space>
            <Text strong>{user.username}</Text>
            {user.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
          </Space>
          <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
        </Space>
      </Space>
    </Col>)
  });

  const options = [
    {
      label: renderTitle("Members of " + result.name),
      options: searchedMembers.filter(m => id !== m.id).map(m => renderMember(m))
    }
  ]

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
                  <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={
                    result.isMember || !result.isPrivate ?
                      <Col span={24} align="middle" position="left">
                        <AutoComplete
                          dropdownClassName="certain-category-search-dropdown"
                          dropdownMatchSelectWidth={400}
                          style={{ width: 400, height: 35 }}
                          onChange={(value) => { searchMember(value) }}
                          onSelect={(item) => { navigate(`/profiles/${item.key}`) }}
                          options={options}
                        >
                          <Input.Search size="large" placeholder={"Search Members of " + result.name} />
                        </AutoComplete>
                      </Col> : <></>
                  }>
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
                            <b>Filter Posts</b>
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
                              <Col offset={6} span={12} align="middle">
                                <Text><b>Sort Posts by</b></Text>
                              </Col>
                              <Form.Item
                                name="sortBy">
                                <Col offset={6} span={12} align="middle">
                                  <Radio.Group>
                                    <Radio.Button value="createdAt" buttonStyle="solid" onChange={() => setSortIndex(0)} style={sortIndex === 0 ? buttonStyle : cancelButtonStyle}>New</Radio.Button>
                                    <Radio.Button value="likeCount" buttonStyle="solid" onChange={() => setSortIndex(1)} style={sortIndex === 1 ? buttonStyle : cancelButtonStyle}>Liked</Radio.Button>
                                  </Radio.Group>
                                </Col>
                              </Form.Item>
                              <Form.Item>
                                <Col offset={6} span={12} align="middle">
                                  <Button style={buttonStyle} icon={<FilterOutlined />} type="primary" shape="round" htmlType="submit">
                                    Apply Filters
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