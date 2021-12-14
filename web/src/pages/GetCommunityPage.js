import React, { useState, useEffect } from "react";

import { Layout, Col, Row } from 'antd';
import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import PostView from '../components/PostView';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";
import { GetCommunityPosts as GetCommunityPostsRequest } from "../utils/helper";

const { Header, Footer, Sider, Content } = Layout;

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function GetCommunityPage(props) {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [result, setResult] = useState('');
  const [memberCount, setMemberCount] = useState('');
  const [posts, setPosts] = useState('');

  useEffect(() => {
    GetCommunityPageRequest({id: id, token: loginState.token}, dispatch)
      .then( result => {
        setResult(result.data);
        setMemberCount(Object.keys(result.data.members).length);
        console.log(result.data)
      })
    GetCommunityPostsRequest({ id: id, token: loginState.token }, dispatch)
      .then(posts => {
        setPosts(posts.data.map((post) => {
          return <div style={{margin: '20px'}}><PostView postObj={post} /></div>
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
              <AboutCommunity image={result.iconUrl} name={result.name} description={result.description} members={memberCount} communityID={id}/>
              </Col>
              <Col span={19}>
                  {posts}
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