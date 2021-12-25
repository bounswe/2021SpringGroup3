import React from 'react';

import { Col, List, Image, Card, Typography, Avatar, Space } from 'antd';
import { TeamOutlined, LockOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import 'antd/dist/antd.css';

const { Text, Title } = Typography;

const RecommendedCommunities = (props) => {

    const cardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(props)

    //  <Card style={cardStyle} title={'Top Communities'} align="left">
    //     <List
    //         dataSource={props.communities}
    //         renderItem={community => {
    //             <List.Item>
    //                 <List.Item.Meta
    //                     avatar={<Avatar size={40} src={community.iconUrl} />}
    //                     title={<Text strong>{community.name}</Text>}
    //                     description={<Text style={{ color: 'grey', fontSize: '12px' }}>{community.memberCount + ' members'}</Text>}
    //                 />
    //             </List.Item>
    //         }}
    //     />
    // </Card>

    return (
        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            <Card style={cardStyle} title={'Top Communities'} align="left">
                <Col span={24} align="left">
                    {props.communities && props.communities.map(community => {
                        return (
                            <Col span={24} style={{ cursor: 'pointer', marginBottom: '15px' }} onClick={() => navigate(`/communities/${community.id}`)}>
                                <Space size='middle'>
                                    <Avatar size={40} src={community.iconUrl} />
                                    <Space direction='vertical' size='0px'>
                                        <Space>
                                            <Text strong>{community.name}</Text>
                                            {community.isPrivate ? <LockOutlined /> : <TeamOutlined />}
                                        </Space>
                                        <Text style={{ color: 'grey', fontSize: '12px' }}>{community.memberCount + ' members'}</Text>
                                    </Space>
                                </Space>
                            </Col>
                        )
                    })}
                </Col>
            </Card>
        </div>
    );
}

export default RecommendedCommunities;