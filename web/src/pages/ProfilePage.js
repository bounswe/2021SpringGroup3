import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../components/NavBar';
import ProfileView from '../components/ProfileView';
import { GetProfilePage as GetProfilePageRequest} from "../utils/helper";

import { Layout, Col  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function ProfilePage(props) {
    
    // Mock data
    const tempUserObj = {
        "username": "Temporary User",
        "profilePhotoUrl": "https://picsum.photos/200",
        "bio": "Temporary bio found here.",
        "birthday": "01.02.2003",
        "location": {
          "value": {
            "latitude": 3.435345,
            "longitude": 3.435345
          },
          "isPublic": true,
          "description": "text"
        }
      }

      
    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const [result, setResult] = useState('');

    useEffect(() => {
        GetProfilePageRequest({token: loginState.token}, dispatch)
            .then( result => {
                console.log(result);
                setResult(result.data);
            });
    }, [])

    return (
        <Layout>
            <Header ><NavBar /></Header>
            <Layout>
                <Content>
                    <ProfileView  userObj={result}/>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
    );
}

export default ProfilePage