import React from 'react';
import { Row, Col, Input, Image, Button, Dropdown, Menu, Space } from 'antd';
import { HomeTwoTone, MessageTwoTone, BellTwoTone, UserOutlined, DownOutlined, SettingTwoTone, LogoutOutlined, RightCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Logout } from '../utils/helper';
import { logout } from '../store/actions/loginActions';
import logo from '../utils/logo.png'
import GetCommunities from './GetCommunities'

const { Search } = Input;

const NavBar = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSearch = value => {
        console.log("Searching value: ", value);
    }

    const handleLogout = () => {
        console.log("Trying to log out");
        Logout(loginState.token, dispatch)
        navigate('/login')
    }

    const onCreateCommunity = () => {
        console.log("Request for creating a new community");
        navigate('/createCommunity')
    }

    const onCreatePost = () => {
        console.log("Request for creating a new post");
    }

    const profileMenu = (
        <Menu>
            <Menu.Item key="settings">
                <Button type="text">
                    <SettingTwoTone style={{ fontSize: '16px', marginRight: '4px' }} />
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
            <Row style={{ padding: '4px 16px 4px 16px' }}>
                <Col span={10} verticalAlign='top'>
                    <Space size='middle'>
                        <Image src={logo} style={{ cursor: 'pointer' }} width={40} preview={false} onClick={() => { navigate('/home') }} />
                        <GetCommunities communities={props.communities} />
                        <Button shape="round" onClick={onCreateCommunity}>
                            Create Community
                        </Button>
                        <Button shape="round" onClick={onCreatePost}>
                            Create Post
                        </Button>
                    </Space>
                </Col>
                <Col span={10}>
                    <Search style={{ marginTop: '9px' }} placeholder="input search text" onSearch={onSearch} enterButton />
                </Col>
                <Col span={4} align="right">
                    <Space size="middle">
                        <a target="_blank" rel="noopener noreferrer">
                            <MessageTwoTone style={{ fontSize: '32px' }} />
                        </a>
                        <a target="_blank" rel="noopener noreferrer">
                            <BellTwoTone style={{ fontSize: '32px' }} />
                        </a>
                        <Dropdown overlay={profileMenu} placement="bottomLeft">
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <UserOutlined style={{ fontSize: '32px' }} />
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