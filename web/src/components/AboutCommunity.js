import React from 'react';

import { Col, Descriptions, Button, Image, Card, Row, Space, notification } from 'antd';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import { LeaveCommunity as LeaveCommunityRequest } from '../utils/helper';
import { JoinCommunity as JoinCommunityRequest } from '../utils/helper';
import { JoinCommunityModerator as JoinCommunityModeratorRequest } from '../utils/helper';

import { ApproveUser as ApproveUserRequest } from '../utils/helper';
import { RejectUser as RejectUserRequest } from '../utils/helper';

import { ApproveModerator as ApproveModeratorRequest } from '../utils/helper';
import { RejectModerator as RejectModeratorRequest } from '../utils/helper';

import 'antd/dist/antd.css';

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

    const navigate = useNavigate()

    const sendRequestToJoin = () => {
        notification.success({
            message: 'Community join request sent!',
        });
        console.log(props.communityId)
    }

    const join = () => {
        console.log(props.communityId)
    }

    const leave = () => {
        console.log(props.communityId)
    }

    const sendRequestToBeModerator = () => {
        notification.success({
            message: 'Community moderator role request sent!',
        });
        console.log(props.communityId)
    }

    

    console.log(props)

    return (
        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            <Card style={cardStyle} title={props.name} align="left" cover={<Image src={props.image} />}>
                <Col span={24} align="middle">
                    {props.isMember ?
                        (
                            <Button style={cancelButtonStyle} shape="round" type='primary'
                                onClick={() => leave()}>
                                Leave Community
                            </Button>
                        ) :
                        (props.isPrivate ?
                            <Button style={buttonStyle} shape="round" type='primary'
                                onClick={() => sendRequestToJoin()}>
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
                        props.isMember ?
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
                    <Space>
                        <b>Member Count</b> {props.members === undefined ? "0" : props.members.length}
                    </Space>
                </Col>
                <Col span={24} style={{ marginTop: "20px" }}>
                    <b>Moderators</b>
                </Col>
                {props.moderators === undefined ? "No mods" : props.moderators.slice(0, 5).map(m => <Col span={24}>{m.username}</Col>)}
                <Col span={24} style={{ marginTop: "20px" }}>
                    <b>Members</b>
                </Col>
                {props.members === undefined ? "No members" : props.members.slice(0, 5).map(m => <Col span={24}>{m.username}</Col>)}
                <Col span={24} style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Space>
                        <b>Creator</b> {props.creator ? props.creator.username : "-"}
                    </Space>
                </Col>
                <Col span={24} align="middle">
                    {!props.isModerator ?
                        <Button style={buttonStyle} shape="round" type='primary'
                            onClick={() => sendRequestToBeModerator()}>
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