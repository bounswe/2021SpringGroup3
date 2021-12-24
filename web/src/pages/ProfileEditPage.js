import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import NavBar from "../components/NavBar";
import ProfileEdit from "../components/ProfileEdit";
import { GetProfileSettings as GetProfileSettingsRequest } from "../utils/helper.js";

import { Layout, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function ProfileEditPage(props) {
    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [result, setResult] = useState('');

    useEffect(() => {
        // Request profile settings here
        GetProfileSettingsRequest({ token: loginState.token }, dispatch)
            .then(result => setResult(result.data));
    }, []);

    return (
        <>
            <Layout>
                <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
                <Layout>
                    <Content>
                        <Col span={24} align="right">
                            { result && <ProfileEdit key={result} profileValues={result} /> }
                        </Col>
                    </Content>
                </Layout>
                <Footer></Footer>
            </Layout>
        </>
    );
}

export default ProfileEditPage;
