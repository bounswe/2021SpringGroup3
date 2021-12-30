import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Col, Space, Avatar, Typography } from 'antd';
import { TeamOutlined, LockOutlined } from '@ant-design/icons';

import { GetCommunities as GetCommunitiesRequest } from '../utils/helper';

const { Option } = Select;
const { Text } = Typography;

const GetCommunities = (props) => {
    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [result, setResult] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        GetCommunitiesRequest({ isMember: true }, loginState.token, dispatch)
            .then(result => {
                if (result.data) {
                    setResult(result.data)
                    if (props.isCreatePost) {
                        setOptions(
                            result.data.map(item => {
                                return {
                                    label: item.name,
                                    value: item.id
                                }
                            }))
                    } else {
                        setOptions(result.data.map(item => {
                            return {
                                label: (<Col span={24} style={{ cursor: 'pointer', marginBottom: '5px', marginTop: '5px' }}>
                                    <Space size='middle'>
                                        <Avatar size={40} src={item.iconUrl} />
                                        <Space direction='vertical' size='0px'>
                                            <Space>
                                                <Text strong>{item.name}</Text>
                                                {item.isPrivate ? <LockOutlined /> : <TeamOutlined />}
                                            </Space>
                                            <Text style={{ color: 'grey', fontSize: '12px' }}>{item.memberCount + ' members'}</Text>
                                        </Space>
                                    </Space>
                                </Col>),
                                value: item.id
                            }
                        }))
                    }
                }
            });
    }, [])

    function handleChange(value) {
        console.log(`selected ${value}`);
        if (props.isCreatePost) {
            props.onSelectCommunity(value)
        } else {
            navigate(`/communities/${value}`);
        }
    }

    return (
        <Select
            defaultValue="Joined Communities"
            style={{ width: props.isCreatePost ? "100%" : 180, marginBottom: "30px" }}
            options={options}
            onSelect={handleChange}
        >
        </Select>
    );
}

export default GetCommunities;