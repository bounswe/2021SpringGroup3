import React from 'react';

import { Col, Descriptions, Button, Image } from 'antd';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router';

import 'antd/dist/antd.css';

const AboutCommunity = (props) => {

    const buttonStyle = {
        backgroundColor: '#6f74dd',
        borderColor: '#6f74dd',
        color: '#ffffff',
        cursor: 'pointer',
        marginTop: '3px',
        marginBottom: '3px',
      }

    const navigate = useNavigate()

    console.log(props)

    return ( 
        <div style={{margin: '20px'}}>
            <Col span={24} align="middle">
                <Button style={buttonStyle} shape="round" type='primary'>Follow Community</Button>
            </Col>
            <Col span={24} align="middle">
                <Image src={props.image}/>
            </Col>
            <Descriptions layout="vertical" bordered size="small" column={1}>
                <Descriptions.Item label="Community Name"><b>{props.name}</b></Descriptions.Item>
                <Descriptions.Item label="Description">{props.description}</Descriptions.Item>
                <Descriptions.Item label="Members">{props.members === undefined ? "No members" : props.members + " people"}</Descriptions.Item>
            </Descriptions>
            <Col span={24} align="middle">
                <Button style={buttonStyle} shape="round" type='primary' onClick={() => navigate(`/createPostType`,{ state: { id: props.communityID }})}> Create Post Type</Button>
            </Col>
            <Col span={24} align="middle">
                <Button style={buttonStyle} shape="round" type='primary' onClick={() => navigate(`/createPost`,{ state: { id: props.communityID }})}> Create Post</Button>
            </Col>
        </div>
     );
}
 
export default AboutCommunity;