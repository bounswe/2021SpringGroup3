import { useState, React, useEffect } from 'react';

import { Col, Descriptions, Button, Image, Card, Row, Space, notification, Tooltip, Typography, Popconfirm, message, Avatar, Badge } from 'antd';
import { CheckOutlined, CloseOutlined, UserDeleteOutlined, DeleteOutlined, ExclamationCircleOutlined, TeamOutlined, LockOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import { AcceptUser as AcceptUserRequest } from '../utils/helper';
import { RejectUser as RejectUserRequest } from '../utils/helper';
import { AcceptModerator as AcceptModeratorRequest } from '../utils/helper';
import { RejectModerator as RejectModeratorRequest } from '../utils/helper';
import { KickUser as KickUserRequest } from '../utils/helper';
import { DeleteCommunity as DeleteCommunityRequest } from '../utils/helper';

import 'antd/dist/antd.css';

const { Text, Title } = Typography;

const CommunityModeration = (props) => {

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

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [requests, setRequests] = useState(props.pendingMembers.map(user => {
        return <div key={user.id}>
                <Col span={24} style={{ marginBottom: '15px' }}>
                    <Space size='small'>
                        <Tooltip title="Accept join request">
                            <Button type='primary' shape='circle' style={buttonStyle}
                                icon={<CheckOutlined />}
                                onClick={() => accept(user)}>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Reject join request">
                            <Button type='primary' shape='circle' style={cancelButtonStyle}
                                icon={<CloseOutlined />}
                                onClick={() => reject(user)}>
                            </Button>
                        </Tooltip>
                        <Avatar size={40} src={user.profilePhotoUrl.value} />
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

    const [modRequests, setModRequests] = useState(props.pendingModerators.map(user => {
        return <div key={user.id}>
                <Col span={24} style={{ marginBottom: '15px' }}>
                    <Space size='small'>
                        <Tooltip title="Accept mod request">
                            <Button type='primary' shape='circle' style={buttonStyle}
                                icon={<CheckOutlined />}
                                onClick={() => acceptMod(user)}>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Reject mod request">
                            <Button type='primary' shape='circle' style={cancelButtonStyle}
                                icon={<CloseOutlined />}
                                onClick={() => rejectMod(user)}>
                            </Button>
                        </Tooltip>
                        <Avatar size={40} src={user.profilePhotoUrl.value} />
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

    const [members, setMembers] = useState(props.members.map(user => {
        return <div key={user.id}>
                <Col span={24} style={{ marginBottom: '15px' }}>
                    <Space size='small'>
                        <Tooltip title="Kick user from community">
                            <Button disabled={user.username == loginState.username} type='primary' shape='circle' style={cancelButtonStyle}
                                icon={<UserDeleteOutlined />}
                                onClick={() => kick(user)}>
                            </Button>
                        </Tooltip>
                        <Avatar size={40} src={user.profilePhotoUrl.value} />
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

    const [clickedUser, setClickedUser] = useState({})

    useEffect(() => {
        if (clickedUser.actionType == 'request') setRequests(requests.filter(u => u.key != clickedUser.id));
        if (clickedUser.actionType == 'modRequest') setModRequests(modRequests.filter(u => u.key != clickedUser.id));
        if (clickedUser.actionType == 'kick') setMembers(members.filter(u => u.key != clickedUser.id));
    }, [clickedUser])

    const accept = async (user) => {
        try {
            setClickedUser({ ...user, actionType: 'request' })
            let body = { communityId: props.communityId, userId: user.id }
            const result = await AcceptUserRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Accepted join request of ${user.username}.`
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    const reject = async (user) => {
        try {
            setClickedUser({ ...user, actionType: 'request' })
            let body = { communityId: props.communityId, userId: user.id }
            const result = await RejectUserRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Rejected join request of ${user.username}.`,
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    const acceptMod = async (user) => {
        try {
            setClickedUser({ ...user, actionType: 'modRequest' })
            let body = { communityId: props.communityId, userId: user.id }
            const result = await AcceptModeratorRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Accepted mod request of ${user.username}.`,
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    const rejectMod = async (user) => {
        try {
            setClickedUser({ ...user, actionType: 'modRequest' })
            let body = { communityId: props.communityId, userId: user.id }
            const result = await RejectModeratorRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Rejected mod request of ${user.username}.`,
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    const kick = async (user) => {
        try {
            setClickedUser({ ...user, actionType: 'kick' })
            let body = { communityId: props.communityId, userId: user.id }
            const result = await KickUserRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Kicked ${user.username} from ${props.name}.`,
            });
        } catch (err) {
            message.error('An error occured');
        }
    }

    const deleteCommunity = async () => {
        try {
            let body = { communityId: props.communityId }
            const result = await DeleteCommunityRequest(body, loginState.token, dispatch);
            notification.success({
                message: `Deleted ${props.name} community.`,
            });
            navigate(`/`)
        } catch (err) {
            message.error('An error occured');
        }
    }

    console.log(props)

    return (
        <div>
            <Card style={cardStyle} title={requests.length > 0 ? <Space><Text>{`Join requests to ${props.name}`}</Text><Badge count={requests.length}/></Space> : `There are no existing join requests for ${props.name}`} size="small" align="left">
                {requests}
            </Card>
            <Card style={{ ...cardStyle, marginTop: "20px" }} title={modRequests.length > 0 ? <Space><Text>{`Moderator role requests to ${props.name}`}</Text><Badge count={modRequests.length} /></Space> : `There are no existing mod role requests for ${props.name}`} size="small" align="left">
                {modRequests}
            </Card>
            <Card style={{ ...cardStyle, marginTop: "20px" }} title={<Space><Text>{`Members of ${props.name}`}</Text><Badge style={{backgroundColor: 'green'}}count={members.length} /></Space>} size="small" align="left">
                {members}
            </Card>
            <Col span={24} align="right" style={{ marginTop: "20px" }}>
                <Popconfirm
                    icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                    placement="leftBottom"
                    title={`Are you sure that you want to delete ${props.name} community?`}
                    onConfirm={() => deleteCommunity()}
                    okText="Confirm Delete"
                    cancelText="Cancel"
                >
                    <Button type='primary' shape="round" style={{ borderColor: "red", backgroundColor: "red" }} icon={<DeleteOutlined />}>
                        Delete Community
                    </Button>
                </Popconfirm>

            </Col>
        </div>
    );
}

export default CommunityModeration;