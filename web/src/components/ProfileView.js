import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Space, Avatar, Tooltip, notification } from 'antd';
import buttonColor from '../colors'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import { UserAddOutlined, UserDeleteOutlined, MessageOutlined } from '@ant-design/icons';

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

import 'antd/dist/antd.css';
import { postProfileSettings } from '../store/axios';

const { Text, Title } = Typography;

const ProfileView = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const buttonStyle = {
        backgroundColor: '#6f74dd',
        borderColor: '#6f74dd',
        color: '#ffffff',
        cursor: 'pointer'
    }

    const cancelButtonStyle = {
        backgroundColor: '#ffffff',
        borderColor: '#6f74dd',
        color: '#6f74dd',
        cursor: 'pointer'
    }

    let profileCardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const [isFollowing, setFollowing] = useState(props.userObj.isFollowing)

    const followUser = (userId) => {
        console.log(`Trying to follow user, send a POST request to users/${userId}/follow`);
        if (props.userObj.isProfilePublic) {
            setFollowing(true)
        } else {
            notification.success({
                message: 'Follow request sent!',
            });
        }
    }

    const stopFollowingUser = (userId) => {
        console.log(`Trying to stop following user, send a DELETE request to users/${userId}/follow`);
        setFollowing(false)
    }

    const messageUser = (userId) => {
        console.log(`Hi`);
    }

    function Map() {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: props.latitude, lng: props.longitude }}
            >
                <Marker
                    key={props.userObj.id}
                    position={{ lat: props.latitude, lng: props.longitude }}
                />
            </GoogleMap>
        )
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    const date = new Date(props.userObj.birthday);
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <Card size="small" style={profileCardStyle}>
                <Row>
                    <Space size={'large'} style={{margin: '5px'}}>
                        <Avatar size={100} src={props.userObj.profilePhotoUrl} />
                        <Text style={{fontSize: "30px", fontWeight: 'bold'}}>{props.userObj.username}</Text>
                        {loginState.username != props.userObj.username && <>
                        <Tooltip title={isFollowing ? 'Unfollow' : 'Follow user'}>
                            {isFollowing ?
                                <Button style={cancelButtonStyle} shape="round" icon={<UserDeleteOutlined />} onClick={() => stopFollowingUser(props.userObj.id)}>Unfollow</Button> :
                                <Button style={buttonStyle} shape="round" icon={<UserAddOutlined />} onClick={() => followUser(props.userObj.id)} type="primary">
                                    {props.userObj.isPrivate ? 'Send Follow Request' : 'Follow'}
                                </Button>
                            }
                        </Tooltip>
                        {isFollowing && <Button style={buttonStyle} shape="circle" icon={<MessageOutlined />} onClick={() => messageUser(props.userObj.id)} type="primary" />}</>}
                    </Space>
                </Row>
                <Card size="small" style={{ width: '100%', borderRadius: '10px', borderColor: '#ffffff', marginTop: "10px", marginBottom: "10px" }}>
                    <Col span={24}>
                        <Space size={'middle'}>
                            <strong>Bio</strong>
                            {props.userObj.bio ? 
                            props.userObj.bio : 
                            <Text style={{fontStyle: 'italic', color:"grey"}}>{`${props.userObj.username}'s bio is not set, or private.`}</Text>}
                        </Space>
                    </Col>

                    <Col span={24}>
                        <Space size={'middle'}>
                            <strong>Birthday</strong>
                            {props.userObj.birthday ? 
                                dateTimeFormat.format(date) :
                                <Text style={{fontStyle: 'italic', color:"grey"}}>{`${props.userObj.username}'s birthday is not set, or private.`}</Text>}
                        </Space>
                    </Col>

                    <Col span={24}>
                        <Space size={'middle'}>
                        <strong>Location</strong>
                        {!props.latitude && <Text style={{fontStyle: 'italic', color:"grey"}}>{`${props.userObj.username}'s location is not set, or private.`}</Text>}
                        </Space>
                    </Col>
                    {
                        props.latitude &&
                        <Col span={24}>
                        <div style={{ height: "120px", width: "500px" }}>
                            <WrappedMap
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                                loadingElement={<div style={{ height: "100%" }}></div>}
                                containerElement={<div style={{ height: "100%" }}></div>}
                                mapElement={<div style={{ height: "100%" }}></div>}
                            />
                        </div>
                    </Col>
                    }
                </Card>
            </Card>
        </>
    )
}

export default ProfileView