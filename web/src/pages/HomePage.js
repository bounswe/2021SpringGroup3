import React, { useEffect } from "react";
import { Layout, Row, Col } from 'antd';
import NavBar from '../components/NavBar'

import OneSignal from 'react-onesignal';

const { Header, Footer, Sider, Content } = Layout;

function HomePage() {

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
        <Layout>
          <Content>
            <Row>
              <Col span={24} align="middle" style={{ "marginTop": "50px" }}>
                <strong>Please select a community to see the posts shared there.</strong>
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
    </>
  );
}

export default HomePage;
