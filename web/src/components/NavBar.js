import React from 'react';
import { Row, Col, Input, Image, Button, Dropdown, Menu, Space } from 'antd';
import { MessageFilled, BellFilled, UserOutlined, LogoutOutlined, DownOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Logout } from '../utils/helper';
import logo from '../utils/BoxyHeadlineCat.png'
import GetCommunities from './GetCommunities'

const { Search } = Input;

const NavBar = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const buttonStyle = {
        backgroundColor: '#6f74dd',
        borderColor: '#6f74dd',
        color: '#ffffff',
        cursor: 'pointer'
    }

    const onSearch = value => {
        console.log("Searching value: ", value);
    }


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
        console.log("Trying to log out");
        Logout(loginState.token, dispatch)
        navigate('/login')
    }

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
                <Col span={21} verticalalign='top'>
                    <Space size='middle'>
                        <Image src={logo} style={{ cursor: 'pointer' }} width={120} preview={false} onClick={() => { navigate('/home') }} />
                        <GetCommunities communities={props.communities} />
                        <Button shape="round" onClick={onCreateCommunity} style={{ ...buttonStyle, marginBottom: '30px' }}>
                            Create Community
                        </Button>
                        <Button shape="round" onClick={onCreatePost} style={{ ...buttonStyle, marginBottom: '30px' }}>
                            Create Post
                        </Button>
                        <div style={{ marginTop: "15px" }}>
                            <Search width={100} style={{ width: '140%' }} placeholder="Input search text" onSearch={onSearch} enterButton />
                        </div>
                    </Space>
                </Col>
                <Col span={3} align='right'>
                    <Space size="middle" style={{marginTop: "5px"}}>
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