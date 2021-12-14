import React from "react";
import { Layout,  } from 'antd';
import NavBar from '../components/NavBar';
import CreatePost from '../components/CreatePost';

const { Header, Footer, Sider, Content } = Layout;

function CreatePostPage() {
  return (
    <>
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content><CreatePost /></Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default CreatePostPage;