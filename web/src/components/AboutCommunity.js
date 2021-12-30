import React, { useState, useEffect } from 'react';

import { Col, Descriptions, Button, Image, Card, Row, Space, notification, Tooltip, Typography, Avatar, message } from 'antd';
import { TeamOutlined, LockOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import { LeaveCommunity as LeaveCommunityRequest } from '../utils/helper';
import { JoinCommunity as JoinCommunityRequest } from '../utils/helper';
import { JoinCommunityModerator as JoinCommunityModeratorRequest } from '../utils/helper';

import 'antd/dist/antd.css';

const { Text, Title } = Typography;

const AboutCommunity = (props) => {

    const buttonStyle = {
        backgroundColor: '#6f74dd',
        borderColor: '#6f74dd',
        color: '#ffffff',
        cursor: 'pointer',
        marginTop: '3px',
        marginBottom: '6px',
        width: '100%'
    }

    const cancelButtonStyle = {
        backgroundColor: '#ffffff',
        borderColor: '#6f74dd',
        color: '#6f74dd',
        cursor: 'pointer',
        marginTop: '3px',
        marginBottom: '6px',
        width: '100%'
    }

    const cardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const [isMember, setIsMember] = useState(props.isMember);

    useEffect(() => {
        setIsMember(props.isMember)
    }, [])

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const join = async () => {
        try {
            let body = { communityId: props.communityId }
            const result = await JoinCommunityRequest(body, loginState.token, dispatch);
            notification.success({
                message: props.isPrivate ? `Join request sent to ${props.name} mods.` : `Joined to ${props.name} community.`,
            });

            if (!props.isPrivate) setIsMember(true);
        } catch (err) {
            message.error('An error occured');
        }
    }

    const leave = async () => {
        try {
            let body = { communityId: props.communityId }
            const result = await LeaveCommunityRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Left ${props.name} community.`,
            });
            navigate(`/`)
        } catch (err) {
            message.error('An error occured');
        }
    }

    const joinModerator = async () => {
        try {
            let body = { communityId: props.communityId }
            const result = await JoinCommunityModeratorRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Mod role request sent to ${props.name} mods.`,
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    console.log(props)

    return (
        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            <Card style={cardStyle}
                title={
                    <Space size='middle'>
                        {
                            props.isPrivate ?
                                <Tooltip placement="topLeft" title="Private Community"><LockOutlined /></Tooltip> :
                                <Tooltip placement="topLeft" title="Public Community"><TeamOutlined /></Tooltip>
                        }
                        {props.name}
                        <Text style={{ color: 'grey', fontSize: '14px' }}>{props.members === undefined ? "0 members" : props.members.length + ' members'}</Text>
                    </Space>
                }
                align="left"
                cover={<Image src={props.image} />}
            >
                <Col span={24} align="middle">
                    {isMember ?
                        (
                            <Button style={cancelButtonStyle} shape="round" type='primary'
                                onClick={() => leave()}>
                                Leave Community
                            </Button>
                        ) :
                        (props.isPrivate ?
                            <Button style={buttonStyle} shape="round" type='primary'
                                onClick={() => join()}>
                                Request to Join Community
                            </Button> :
                            <Button style={buttonStyle} shape="round" type='primary'
                                onClick={() => join()}>
                                Join Community
                            </Button>
                        )
                    }
                </Col>
                <Col span={24} align="middle">
                    {
                        props.isModerator ?
                            <Button style={buttonStyle} shape="round" type='primary'
                                onClick={() => navigate(`/createPostType`, { state: { id: props.communityId, communityName: props.name } })}>
                                Create Post Type
                            </Button> :
                            <></>
                    }
                </Col>
                <Col span={24} align="middle">
                    {
                        isMember ?
                            <Button style={buttonStyle} shape="round" type='primary'
                                onClick={() => navigate(`/createPost`, { state: { id: props.communityId } })}>
                                Create Post
                            </Button> :
                            <></>
                    }
                </Col>

                <Col span={24} style={{ marginTop: "20px" }}>
                    <b>About Community</b>
                </Col>
                <Col span={24}>
                    {props.description}
                </Col>
                <Col span={24} style={{ marginTop: "20px" }}>
                    <b>Moderators</b>
                </Col>
                {props.moderators === undefined ? "No mods" : props.moderators.slice(0, 10).map(user => {
                    return (
                        <Col span={24} style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={() => navigate(`/profiles/${user.id}`)}>
                            <Space size='middle'>
                                <Avatar size={40} src={user.profilePhotoUrl.value} />
                                <Space direction='vertical' size='0px'>
                                    <Space>
                                        <Text strong>{user.username}</Text>
                                        {user.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
                                    </Space>
                                    <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
                                </Space>
                            </Space>
                        </Col>
                    )
                })}
                <Col span={24} style={{ marginTop: "20px" }}>
                    <b>Members</b>
                </Col>
                {props.members === undefined ? "No members" : props.members.slice(0, 10).map(user => {
                    return (
                        <Col span={24} style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={() => navigate(`/profiles/${user.id}`)}>
                            <Space size='middle'>
                                <Avatar size={40} src={user.profilePhotoUrl.value} />
                                <Space direction='vertical' size='0px'>
                                    <Space>
                                        <Text strong>{user.username}</Text>
                                        {user.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
                                    </Space>
                                    <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
                                </Space>
                            </Space>
                        </Col>
                    )
                })}
                <Col span={24} style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Col span={24} style={{ marginTop: "20px" }}>
                        <b>Creator</b>
                    </Col>
                    {props.creator ?
                        <Col span={24} style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={() => navigate(`/profiles/${props.creator.id}`)}>
                            <Space size='middle'>
                                <Avatar size={40} src={props.creator.profilePhotoUrl.value} />
                                <Space direction='vertical' size='0px'>
                                    <Space>
                                        <Text strong>{props.creator.username}</Text>
                                        {props.creator.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
                                    </Space>
                                    <Text style={{ color: 'grey', fontSize: '12px' }}>{props.creator.followerCount + ' followers'}</Text>
                                </Space>
                            </Space>
                        </Col> : "-"}
                </Col>
                <Col span={24} align="middle">
                    {!props.isModerator ?
                        <Button style={buttonStyle} shape="round" type='primary'
                            onClick={() => joinModerator()}>
                            Request to be a Mod
                        </Button> :
                        <></>
                    }
                </Col>
            </Card>
        </div>
    );
}

export default AboutCommunity;