import React, { useState } from 'react';
import { Row, Col, Input, Image, Button, Dropdown, Menu, Space, AutoComplete, Avatar, Typography } from 'antd';
import { MessageFilled, BellFilled, UserOutlined, LogoutOutlined, DownOutlined, SettingOutlined, TeamOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Logout } from '../utils/helper';
import logo from '../utils/BoxyHeadlineCat.png'
import GetCommunities from './GetCommunities'

import { SearchCommunities as SearchCommunitiesRequest } from '../utils/helper';
import { SearchUsers as SearchUsersRequest } from '../utils/helper';

const { Text } = Typography;
const { Search } = Input;

const NavBar = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams('');

    const buttonStyle = {
        backgroundColor: '#6f74dd',
        borderColor: '#6f74dd',
        color: '#ffffff',
        cursor: 'pointer'
    }

    const [searchedCommunities, setSearchedCommunities] = useState([])
    //const [searchedUsers, setSearchedUsers] = useState([])

    const onCreateCommunity = () => {
        console.log("Request for creating a new community");
        navigate('/createCommunity')
    }

    const onCreatePost = () => {
        console.log("Request for creating a new post");
        navigate('/createPost')
    }

    const handleProfileNavigate = () => {
        console.log("Navigating to profile page");
        navigate('/profile')
    }

    const handleSettingsNavigate = () => {
        navigate('/profile/edit');
    }

    const handleLogout = () => {
        Logout(loginState.token, dispatch)
        navigate('/login')
    }

    const searchValue = async (value) => {
        if (!value) {
            setSearchedCommunities([]);
            //setSearchedUsers([]);
            return;
        }
        let resultCommunities = await SearchCommunitiesRequest({ query: value }, loginState.token, dispatch);
        setSearchedCommunities(resultCommunities.data)
        //let resultUsers = await SearchCommunitiesRequest({ query: value }, loginState.token, dispatch);
        //setSearchedUsers(resultUsers.data)
    }

    const renderTitle = (title) => (
        <span>
            {title}
        </span>
    );

    const renderCommunity = (community) => ({
        value: (<Col key={community.id} span={24} style={{ cursor: 'pointer', marginBottom: '5px', marginTop: '5px' }} onClick={() => { navigate(`/communities/${community.id}`)}}>
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
        </Col>)
    });

    const renderUser = (user) => ({
        value: (<Col span={24} style={{ cursor: 'pointer', marginBottom: '5px', marginTop: '5px' }} onClick={() => navigate(`/profiles/${user.id}`)}>
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
        </Col>)
    });

    const options = [
        {
            label: renderTitle('Communities'),
            options: searchedCommunities.filter(c => id !== c.id).map(c => renderCommunity(c))
        },
        // {
        //     label: renderTitle('Users'),
        //     options: searchedUsers.filter(u => id !== u.id).map(u => renderUser(u))
        // }
    ]

    const profileMenu = (
        <Menu>
            <Menu.Item key="profile">
                <Button type="text" onClick={handleProfileNavigate}>
                    <UserOutlined style={{ fontSize: '16px', marginRight: '4px' }} />
                    Profile
                </Button>
            </Menu.Item>
            <Menu.Item key="settings">
                <Button type="text" onClick={handleSettingsNavigate}>
                    <SettingOutlined style={{ fontSize: '16px', marginRight: '4px' }} />
                    Settings
                </Button>
            </Menu.Item>
            <Menu.Item key="logout">
                <Button type="text" onClick={handleLogout}>
                    <LogoutOutlined style={{ fontSize: '16px', marginRight: '4px' }} />
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Row>
                <Col span={21}>
                    <Space size='middle'>
                        <Image src={logo} style={{ cursor: 'pointer' }} width={120} preview={false} onClick={() => { navigate('/home') }} />
                        <GetCommunities communities={props.communities} />
                        <Button shape="round" onClick={onCreateCommunity} style={{ ...buttonStyle, marginBottom: '30px' }}>
                            Create Community
                        </Button>
                        <Button shape="round" onClick={onCreatePost} style={{ ...buttonStyle, marginBottom: '30px' }}>
                            Create Post
                        </Button>
                        {/*<Space size='0px' align='top'>
                            <Row align='top'>
                                <Dropdown overlay={ 
                                    <Menu>
                                        <Menu.Item>
                                            Search by Users
                                        </Menu.Item>
                                        <Menu.Item>
                                            Search by Communities
                                        </Menu.Item>
                                    </Menu>
                                }
                                    placement="bottomCenter"
                                    arrow
                                >
                                        
                                    <Button style={{ height: 40, width: 40 }} icon={<UserOutlined />} />
                                </Dropdown>
                            </Row>
                        </Space>*/}
                        <Row align='top'>
                            <AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={400}
                                style={{ width: 400, height: 55 }}
                                onChange={(value) => { searchValue(value) }}
                                onSelect={(item) => { navigate(`/communities/${item.key}`)}}
                                options={options}
                            >
                                <Input.Search size="large" placeholder="Search Communities" />
                            </AutoComplete>
                        </Row>
                    </Space>
                </Col>
                <Col span={3} align='right'>
                    <Space size="middle" style={{ marginTop: "5px" }}>
                        <a target="_blank" rel="noopener noreferrer">
                            <MessageFilled style={{ fontSize: '32px', color: "#ffffff" }} />
                        </a>
                        <a target="_blank" rel="noopener noreferrer">
                            <BellFilled style={{ fontSize: '32px', color: "#ffffff" }} />
                        </a>
                        <Dropdown overlay={profileMenu} placement="bottomLeft">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <UserOutlined style={{ fontSize: '32px', color: "#ffffff" }} />
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                </Col>
            </Row>
            <hr />
        </div>
    );
}

export default NavBar;