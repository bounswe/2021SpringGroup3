import React, { useState, useEffect } from "react";

import { Layout, Button, Col, Row, Tabs, Typography, Space, Form, message, Input, Card, AutoComplete, Avatar, Radio } from 'antd';
import { IdcardOutlined, TeamOutlined, LockOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';

import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import GetPostTypes from '../components/GetPostTypes';
import PostView from '../components/PostView';
import PostFilter from '../components/PostFilter';
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

function GetCommunityPage(props) {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [result, setResult] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedMembers, setSearchedMembers] = useState([]);


  useEffect(() => {
    GetCommunityPageRequest({ id: id, token: loginState.token }, dispatch)
      .then(result => {
        setResult(result.data);
        GetCommunityPostsRequest({ id: id, token: loginState.token }, dispatch)
        .then(posts => {
          setPosts(posts.data.map((post) => {
            return <div style={{ marginBottom: '20px' }}><PostView postObj={post} isModerator={result.data.isModerator} /></div>
          }))
        })
      })
  }, [id])

  const searchMember = async (value) => {
    if (!value) {
      setSearchedMembers([]);
      return;
    }
    let resultMembers = await SearchMembersRequest({ query: value, communityId: id }, loginState.token, dispatch);
    setSearchedMembers(resultMembers.data)
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
                        {<PostFilter onSelectFilters={(posts) => { setPosts(posts) }}/>}
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