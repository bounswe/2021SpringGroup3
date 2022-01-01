import { useState, React, useEffect } from 'react';

import { Col, Descriptions, Button, Image, Card, Row, Space, notification, Tooltip, Typography, Popconfirm, message, Avatar, Badge } from 'antd';
import { CheckOutlined, CloseOutlined, UserDeleteOutlined, DeleteOutlined, ExclamationCircleOutlined, TeamOutlined, LockOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import { AcceptFollower as AcceptFollowerRequest } from '../utils/helper';
import { RejectFollower as RejectFollowerRequest } from '../utils/helper';

import 'antd/dist/antd.css';

const { Text, Title } = Typography;

const buttonStyle = {
    backgroundColor: '#6f74dd',
    borderColor: '#6f74dd',
    color: '#ffffff',
    cursor: 'pointer',
    marginLeft: '5px'
}

const cancelButtonStyle = {
    backgroundColor: '#ffffff',
    borderColor: '#6f74dd',
    color: '#6f74dd',
    cursor: 'pointer',
    marginLeft: '5px',
    marginRight: '15px'
}

const cardStyle = {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '20px'
}

const ProfileModeration = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams();

    const [clickedUser, setClickedUser] = useState()

    const [requests, setRequests] = useState(props.pendingFollowers.map(user => {
        return <div key={user.id}>
                <Col span={24} style={{ marginBottom: '15px' }}>
                    <Space size='small'>
                        <Tooltip title="Accept follow request">
                            <Button type='primary' shape='circle' style={buttonStyle}
                                icon={<CheckOutlined />}
                                onClick={() => accept(user)}>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Reject follow request">
                            <Button type='primary' shape='circle' style={cancelButtonStyle}
                                icon={<CloseOutlined />}
                                onClick={() => reject(user)}>
                            </Button>
                        </Tooltip>
                        <Avatar size={40} src={user.profilePhotoUrl || ''} />
                        <Space direction='vertical' size='0px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/profiles/${user.id}`)}>
                            <Space>
                                <Text strong>{user.username}</Text>
                                {user.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
                            </Space>
                            <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
                        </Space>
                    </Space>
                </Col>
        </div>
    }))

    const [followerList, setFollowerList] = useState(props.followers.map(user => {
        return <div key={user.id}>
                <Col span={24} style={{ marginBottom: '15px' }}>
                    <Space size='small'>
                        <Avatar size={40} src={user.profilePhotoUrl} />
                        <Space direction='vertical' size='0px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/profiles/${user.id}`)}>
                            <Space>
                                <Text strong>{user.username}</Text>
                                {user.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
                            </Space>
                            <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
                        </Space>
                    </Space>
                </Col>
        </div>
    }))

    useEffect(() => {
        if (clickedUser) {
            let user = props.pendingFollowers.filter(u => u.id == clickedUser.id)[0]
            setRequests(requests.filter(u => u.key != clickedUser.id)); 
            if (clickedUser.isAccepted) {
                setFollowerList([ ...followerList, 
                <div key={user.id}>
                    <Col span={24} style={{ marginBottom: '15px' }}>
                        <Space size='small'>
                            <Avatar size={40} src={user.profilePhotoUrl} />
                            <Space direction='vertical' size='0px' style={{ cursor: 'pointer' }} onClick={() => navigate(`/profiles/${user.id}`)}>
                                <Space>
                                    <Text strong>{user.username}</Text>
                                    {user.isProfilePrivate ? <LockOutlined /> : <TeamOutlined />}
                                </Space>
                                <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
                            </Space>
                        </Space>
                    </Col>
            </div> ])
            }
        }
    }, [clickedUser])

    const accept = async (user) => {
        try {
            setClickedUser({ ...user, isAccepted: true })
            let body = { userId: user.id }
            const result = await AcceptFollowerRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Accepted follow request of ${user.username}.`
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    const reject = async (user) => {
        try {
            setClickedUser({ ...user, isAccepted: false })
            let body = { userId: user.id }
            const result = await RejectFollowerRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Rejected follow request of ${user.username}.`,
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    return (
        <div>
            <Card style={cardStyle} title={requests.length > 0 ? <Space><Text>{`Follow requests`}</Text><Badge count={requests.length}/></Space> : `You have no follow requests`} size="small" align="left">
                {requests}
            </Card>
            <Card style={cardStyle} title={followerList.length > 0 ? <Space><Text>{`Followers`}</Text><Badge style={{backgroundColor: 'green'}} count={followerList.length}/></Space> : `You have no followers`} size="small" align="left">
                {followerList}
            </Card>
        </div>
    );
}

export default ProfileModeration;