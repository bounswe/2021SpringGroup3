import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Card, Space, Typography} from 'antd';
import Notification from '../components/NotificationView';
import NavBar from '../components/NavBar'

import { IdcardOutlined, TeamOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetNotifications as GetNotificationsReqeust } from "../utils/helper";

const { Header, Footer, Content } = Layout;

const { Title } = Typography;

function NotificationsPage() {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams('');

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        GetNotificationsReqeust(loginState.token, dispatch)
            .then(notfs => {
                console.log(notfs.data)
                setNotifications(notfs.data.map(notf => {
                    return (
                        <Col span={24} key={notf.object}>
                            <Notification notfObj={notf} />
                        </Col>
                    )
                }))
            })
    }, [])

    return (
        <>
            <Layout>
                <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
                <Layout>
                    <Content>
                        <Row style={{padding: "12px"}}>
                            <Col span={10} offset={7} align="middle">
                                <Title level={2} strong="true">Notifications</Title>
                            </Col>
                            <Col offset={3} span={18}>
                                {notifications}
                            </Col>
                        </Row>
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        </>
    );
}

export default NotificationsPage;
