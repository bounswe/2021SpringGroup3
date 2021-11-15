import React from "react";
import { Layout,  } from 'antd';
import NavBar from '../components/NavBar';
import AboutCommunity from '../components/AboutCommunity';

const { Header, Footer, Sider, Content } = Layout;

function GetCommunityPage() {
  return (
    <>
    
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content><AboutCommunity /></Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default GetCommunityPage;