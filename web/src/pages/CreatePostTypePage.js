import React from "react";
import { Layout } from 'antd';
import NavBar from '../components/NavBar';
import CreatePostType from '../components/CreatePostType';
import { useLocation } from 'react-router';

const { Header, Footer, Sider, Content } = Layout;

function CreatePostTypePage(props) {

    const { state } = useLocation();
    const { id } = state;

  return (
    <>
    
      <Layout>
        <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
        <Layout>
          <Content><CreatePostType id={id}/></Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default CreatePostTypePage;
