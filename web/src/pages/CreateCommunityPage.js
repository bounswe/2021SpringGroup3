import CreatePost from '../components/CreatePost'
import React from "react";
import { Layout,  } from 'antd';
import NavBar from '../components/NavBar';
import CreateCommunity from '../components/CreateCommunity';

const { Header, Footer, Sider, Content } = Layout;

function CreateCommunityPage() {
  return (
    <>
    
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content><CreateCommunity /></Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default CreateCommunityPage;
