import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Avatar, Tooltip, notification } from 'antd';
import '../App.css';
import FieldContent from './FieldContent';
import buttonColor from '../colors'


import React from "react";

import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Text, Title } = Typography;



const ProfileView = (props) => {

    console.log(props)

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

    const reportPost = (postId) => {
        console.log(`Trying to report post, open post report selection component with ${postId}`)
    }

    return (
        <>
            <Card size="small" style={profileCardStyle}>
                <Row>
                    <Space size={'large'}>
                        <Avatar size={100} src={props.userObj.profilePicture} />
                        <Title>{props.userObj.username}</Title>
                        <Tooltip title={isFollowing ? 'unfollow' : 'follow'}>
                            {isFollowing ?
                                <Button shape="circle" icon={<UserDeleteOutlined />} size="large" onClick={() => stopFollowingUser(props.userObj.id)} /> :
                                <Button style={buttonColor} shape="circle" icon={<UserAddOutlined />} size="large" onClick={() => followUser(props.userObj.id)} type="primary" />
                            }
                        </Tooltip>
                    </Space>
                </Row>
                <Card size="small" style={{ width: '100%', borderRadius: '10px', borderColor: '#ffffff', marginTop: "10px", marginBottom: "10px" }}>
                    {props.userObj.bio && (props.userObj.isBioPublic || isFollowing) ?
                        <>
                            <Col span={24}>
                                <Space size={'middle'}>
                                    <strong>Bio</strong>
                                    <Text>{props.userObj.bio}</Text>
                                </Space>

                            </Col>
                        </> : <></>}
                    {props.userObj.birthday && (props.userObj.isBirthdayPublic || isFollowing) ?
                        <>
                            <Col span={24}>
                                <Space size={'middle'}>
                                    <strong>Birthday</strong>
                                    <Text>{props.userObj.birthday}</Text>
                                </Space>
                            </Col>
                        </> : <></>}
                    {props.userObj.location && (props.userObj.isLocationPublic || isFollowing) ?
                        <>
                            <Col span={24}>
                                <Space size={'middle'}>
                                    <strong>Location</strong>
                                    <Text>{props.userObj.location}</Text>
                                </Space>
                            </Col>
                        </> : <></>}
                </Card>


            </Card>
        </>
    )
}

export default ProfileView