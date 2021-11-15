import React from 'react';
import { Row, Col, Input, Image, Button, Dropdown, Menu } from 'antd';
import { HomeTwoTone, MessageTwoTone, BellTwoTone, UserOutlined, DownOutlined, SettingTwoTone, LogoutOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Search } = Input;

const onSearch = value => {
    console.log("Searching value: ", value);
}

const onCreateCommunity = () => {
    console.log("Request for creating a new community");
}
const onCreatePost = () => {
    console.log("Request for creating a new post");
}
const profileMenu = (
    <Menu>
        <Menu.Item>
            <Button target="_blank" rel="noopener noreferrer">
                <SettingTwoTone style={{fontSize: '16px', marginRight:'4px'}}/>
                Settings
            </Button>
        </Menu.Item>
        <Menu.Item>
            <Button target="_blank" rel="noopener noreferrer">
                <LogoutOutlined style={{fontSize: '16px', marginRight:'4px'}}/>
                Logout
            </Button>
        </Menu.Item>
    </Menu>
  );

const NavBar = () => {

    const loginState = useSelector((state) => state.login);
    console.log(loginState);

    return ( 
        <div>
            <Row align="middle" style={{padding:'8px 16px 4px 16px'}}>
                <Col span={1}>
                    LOGO
                </Col>
                <Col span={1}>
                    <a target="_blank" rel="noopener noreferrer">
                        <HomeTwoTone style={{ fontSize: '32px'}}/>
                    </a>
                </Col>
                <Col span={3}>
                    <Button shape="round" onClick={onCreateCommunity}>
                        Create Community
                    </Button>
                </Col>
                <Col span={2}>
                    <Button shape="round" onClick={onCreatePost}>
                        Create Post
                    </Button>
                </Col>
                <Col span={8} offset={1}>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </Col>
                <Col span={2} offset={2} align="right">
                    <a target="_blank" rel="noopener noreferrer">
                        <MessageTwoTone style={{ fontSize: '32px'}}/>
                    </a>  
                </Col>
                <Col span={2} align="right">
                    <a target="_blank" rel="noopener noreferrer">
                        <BellTwoTone style={{ fontSize: '32px'}}/>
                    </a>  
                </Col>
                <Col span={2} align="right">
                    <Dropdown overlay={profileMenu} placement="bottomLeft">
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <UserOutlined style={{ fontSize: '32px'}}/> 
                            <DownOutlined />
                        </a>
                    </Dropdown>
                </Col>
            </Row>
            <hr/>
        </div>
     );
}
 
export default NavBar;