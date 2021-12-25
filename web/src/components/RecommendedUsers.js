import React from 'react';

import { Col, Row, Image, Card, Typography, Avatar, Space } from 'antd';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import 'antd/dist/antd.css';

const { Text, Title } = Typography;

const RecommendedUsers = (props) => {

    const cardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(props)

    return (
        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            <Card style={cardStyle} title={'Recommended Users'} align="left">
                <Col span={24} align="left">
                    {props.users && props.users.map(user => {
                        return (
                            <Col span={24} style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => navigate(`/profiles/${user.id}`)}>
                                <Space size='middle'>
                                    <Col span={4}>
                                        <Avatar size={40} src={user.profilePhotoUrl.value} />
                                    </Col>
                                    <Col span={20}>
                                        <Row>
                                            <Text strong>{user.username}</Text>
                                        </Row>
                                        <Row>
                                            <Text style={{ color: 'grey', fontSize: '12px' }}>{user.followerCount + ' followers'}</Text>
                                        </Row>
                                    </Col>
                                </Space>
                            </Col>
                        )
                    })}
                </Col>
            </Card>
        </div>
    );
}

export default RecommendedUsers;