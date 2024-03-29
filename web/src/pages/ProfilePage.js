import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../components/NavBar';
import ProfileView from '../components/ProfileView';
import { GetProfilePage as GetProfilePageRequest } from "../utils/helper";
import { GetProfileOtherPage as GetProfileOtherPageRequest } from "../utils/helper";

import { Layout, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function ProfilePage(props) {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(loginState)

    const { id } = useParams('');

    const [result, setResult] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if (id) {
            GetProfileOtherPageRequest({ token: loginState.token, id: id }, dispatch)
                .then(result => {
                    setResult(result.data);
                    if (result.data.location && result.data.location.value) {
                        setLatitude(result.data.location.latitude);
                        setLongitude(result.data.location.longitude);
                    }
                })
        } else {
            GetProfilePageRequest({ token: loginState.token }, dispatch)
                .then(result => {
                    setResult({... result.data, location: result.data.location.value ? {latitude: result.data.location.value.latitude, longitude: result.data.location.value.longitude } : {latitude: 29, longitude: 41 }});
                    setLatitude(result.data.location.latitude);
                    setLongitude(result.data.location.longitude);
                });
        }
    }, [id])

    return (
        <Layout>
            <Header style={{ backgroundColor: '#3949ab' }}><NavBar /></Header>
            <Layout>
                <Content>
                    <Col span={16} offset={4} style={{marginTop: '20px'}}>
                        {result ? <ProfileView userObj={result} latitude={latitude} longitude={longitude} /> : <></>}
                    </Col>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
    );
}

export default ProfilePage