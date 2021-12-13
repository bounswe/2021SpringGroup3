import CreatePost from '../components/CreatePost'
import React from "react";
import { Layout,  } from 'antd';
import NavBar from '../components/NavBar'
import Post from '../components/Post'

const { Header, Footer, Sider, Content } = Layout;

function HomePage() {
  return (
    <>
    
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content>Posts</Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default HomePage;