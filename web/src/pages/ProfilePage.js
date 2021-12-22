import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../components/NavBar';
import ProfileView from '../components/ProfileView';
import { GetProfilePage as GetProfilePageRequest} from "../utils/helper";
import { GetProfileOtherPage as GetProfileOtherPageRequest } from "../utils/helper";

import { Layout, Col  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function ProfilePage(props) {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams('');

    const [result, setResult] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if (id) {
            GetProfileOtherPageRequest({token: loginState.token, id: id}, dispatch)
            .then( result => {
                setResult(result.data);
                if('value' in result.data.location){
                    setLatitude(result.data.location.value.latitude);
                    setLongitude(result.data.location.value.longitude);
                }

                console.log(result);
            })
        } else {
            GetProfilePageRequest({token: loginState.token}, dispatch)
            .then( result => {
                setResult(result.data);
                setLatitude(result.data.location.value.latitude);
                setLongitude(result.data.location.value.longitude);
                console.log(result);
            });
        }
    }, [])

    return (
        <Layout>
            <Header style={{backgroundColor: '#3949ab'}}><NavBar /></Header>
            <Layout>
                <Content>
                    <ProfileView  userObj={result} latitude={latitude} longitude={longitude}/>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
    );
}

export default ProfilePage