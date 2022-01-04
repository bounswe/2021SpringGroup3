import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Typography, Space, Avatar, Tooltip, notification, Tabs } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { UserOutlined, MessageOutlined, UserDeleteOutlined, UserAddOutlined, MailOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

import ProfileModeration from './ProfileModeration';

import { Follow as FollowRequest } from '../utils/helper';
import { Unfollow as UnfollowRequest } from '../utils/helper';

import { GetProfileSettings as GetProfileSettingsRequest } from '../utils/helper';

import 'antd/dist/antd.css';

const { Text, Title } = Typography;

const { TabPane } = Tabs;

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

const ProfileView = (props) => {

    console.log(props.userObj)

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams();

    const [isFollowing, setFollowing] = useState(props.userObj.isFollowing ? 1 : 0);
    const [followerCount, setFollowerCount] = useState(props.userObj.followerCount);

    const [pendingFollowers, setPendingFollowers] = useState([]);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        GetProfileSettingsRequest({ token: loginState.token }, dispatch)
          .then(result => {
            setFollowers(result.data.followers || [])
            setPendingFollowers(result.data.pendingFollowers || [])
          })
      }, [])

    const followUser = async () => {
        if (!props.userObj.isPrivate) {
            let result = await FollowRequest({ userId: id }, loginState.token, dispatch);
            setFollowing(1)
            setFollowerCount(followerCount + 1)
            notification.success({
                message: `Followed ${props.userObj.username}`,
            });
        } else {
            let result = await FollowRequest({ userId: id }, loginState.token, dispatch);
            setFollowing(2)
            notification.success({
                message: `Follow request sent to ${props.userObj.username}`,
            });
        }
    }

    const unfollowUser = async () => {
        let result = await UnfollowRequest({ userId: id }, loginState.token, dispatch);
        setFollowing(0)
        setFollowerCount(followerCount - 1)
        notification.success({
            message: `Unfollowed ${props.userObj.username}`,
        });
    }

    const messageUser = () => {
        console.log(`Hi`);
    }

    function Map() {
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: props.userObj.location.latitude, lng: props.userObj.location.longitude }}
            >
                <Marker
                    key={id}
                    position={{ lat: props.userObj.location.latitude, lng: props.userObj.location.longitude }}
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
            <Tabs defaultActiveKey="1" type="card">
                <TabPane
                    tab={
                        <span>
                            <UserOutlined />
                            <b>Profile</b>
                        </span>
                    }
                    key="1"
                >
                    <Card size="small" style={profileCardStyle}>
                        <Row>
                            <Space size={'large'} style={{ margin: '5px' }}>
                                <Avatar size={100} src={props.userObj.profilePhotoUrl} />
                                <Text style={{ fontSize: "30px", fontWeight: 'bold' }}>{props.userObj.username}</Text>
                                {loginState.username != props.userObj.username && <>
                                    {<Text style={{ color: 'grey', fontSize: '12px' }}>{followerCount + ' followers'}</Text>}
                                    <Tooltip title={isFollowing === 1 ? 'Unfollow user' : (isFollowing === 2 ? 'Pending Response' : 'Follow user')}>
                                        {isFollowing === 1 ?
                                            <Button style={cancelButtonStyle} shape="round" icon={<UserDeleteOutlined />} onClick={() => unfollowUser()}>Unfollow</Button> :
                                            (isFollowing === 2 ?
                                                <Button style={cancelButtonStyle} shape="round" icon={<CheckCircleOutlined />} type="primary">
                                                    {'Request Sent'}
                                                </Button> : (
                                                    props.userObj.isPrivate ?
                                                        <Button style={buttonStyle} shape="round" icon={<UserAddOutlined />} onClick={() => followUser()} type="primary">
                                                            {'Send Follow Request'}
                                                        </Button> :
                                                        <Button style={buttonStyle} shape="round" icon={<UserAddOutlined />} onClick={() => followUser()} type="primary">
                                                            {'Follow'}
                                                        </Button>
                                                ))
                                        }
                                    </Tooltip>
                                    {isFollowing === 1 && <Button style={buttonStyle} shape="circle" icon={<MessageOutlined />} onClick={() => messageUser()} type="primary" />}
                                </>}
                            </Space>
                        </Row>
                        <Card size="small" style={{ width: '100%', borderRadius: '10px', borderColor: '#ffffff', marginTop: "10px", marginBottom: "10px" }}>
                            <Col span={24}>
                                <Space size={'middle'}>
                                    <strong>Bio</strong>
                                    {props.userObj.bio ?
                                        props.userObj.bio :
                                        <Text style={{ fontStyle: 'italic', color: "grey" }}>{`${props.userObj.username}'s bio is not set, or private.`}</Text>}
                                </Space>
                            </Col>

                            <Col span={24}>
                                <Space size={'middle'}>
                                    <strong>Birthday</strong>
                                    {props.userObj.birthday ?
                                        dateTimeFormat.format(date) :
                                        <Text style={{ fontStyle: 'italic', color: "grey" }}>{`${props.userObj.username}'s birthday is not set, or private.`}</Text>}
                                </Space>
                            </Col>

                            <Col span={24}>
                                <Space size={'middle'}>
                                    <strong>Location</strong>
                                    {!props.userObj.location && <Text style={{ fontStyle: 'italic', color: "grey" }}>{`${props.userObj.username}'s location is not set, or private.`}</Text>}
                                </Space>
                            </Col>
                            {
                                props.userObj.location &&
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
                </TabPane>
                {loginState.username == props.userObj.username &&
                    <TabPane
                        tab={
                            <span>
                                <MailOutlined />
                                <b>Follow Requests</b>
                            </span>
                        }
                        key="2"
                    >
                        <ProfileModeration pendingFollowers={pendingFollowers} followers={followers}/>
                    </TabPane>}
            </Tabs>
        </>
    )
}

export default ProfileView