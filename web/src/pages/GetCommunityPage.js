import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';
import { GetCommunityPage as GetCommunityPageRequest } from "../utils/helper";

import { Layout, Col  } from 'antd';
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
  
  const [commId, setCommID] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    setCommID(id);
  }, []);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    console.log("id in getcommunitypage ",id)
    GetCommunityPageRequest({id: id, token: loginState.token}, dispatch)
      .then( result => {
        setResult(result.data.name)  
        forceUpdate();
      }
      );
  }, [])

  return (
    <> 
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content>
            <Col span={24} align="right">
              <AboutCommunity key={result.description} description={result} members="123 (placeholder)" created="16.11.2021 (placeholder)" communityID={id}/>
            </Col>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default GetCommunityPage;