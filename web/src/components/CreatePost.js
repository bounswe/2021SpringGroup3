import React from 'react';
import { Layout, Menu } from 'antd';
import CreatePostForm from "./CreatePostForm";

const { Content, Sider } = Layout;

const CreatePost = () => {
  
  return (
  <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['2']}
        style={{ height: '100%' }}
      >
          <Menu.Item key="0" disabled>Post Types</Menu.Item>
          <Menu.Item key="1">Lost</Menu.Item>
          <Menu.Item key="2">Event</Menu.Item>
          <Menu.Item key="3">Sale</Menu.Item>
          <Menu.Item key="4">Lesson</Menu.Item>
        
      </Menu>
    </Sider>
    <Content style={{ padding: '0 24px', minHeight: 280 }}><CreatePostForm /></Content>
  </Layout>
  );
}

export default CreatePost;