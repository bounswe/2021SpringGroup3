import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Col  } from 'antd';
import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";

const { Header, Footer, Sider, Content } = Layout;

function GetCommunityPage(props) {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { id } = useParams();
  
  const [result, setResult] = useState('');

  useEffect(() => {
    GetCommunityPageRequest({id: id, token: loginState.token}, dispatch)
      .then( result => setResult(result.data.name));
  }, [])

  console.log(result);

  return (
    <> 
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content>
            <Col span={24} align="right">
              <AboutCommunity description={result} members="123 (placeholder)" created="16.11.2021 (placeholder)" communityID={id}/>
            </Col>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default GetCommunityPage;