import React from 'react';
import { Col, Descriptions, Button } from 'antd';
import { useNavigate, useParams } from 'react-router';

import 'antd/dist/antd.css';

const AboutCommunity = (props) => {

    const navigate = useNavigate()

    console.log(props)

    return ( 
        <div style={{margin: '20px'}}>
            <Col span={24} align="middle">
                <Button shape="round" type='primary'>Follow Community</Button>
            </Col>
            <Descriptions layout="vertical" bordered size="small" column={1}>
                <Descriptions.Item label="About Community">{props.description}</Descriptions.Item>
                <Descriptions.Item label="Members">{props.members === undefined ? "No members" : props.members + "people"}</Descriptions.Item>
                <Descriptions.Item label="Created in">{props.created}</Descriptions.Item>
            </Descriptions>
            <Col span={24} align="middle">
                <Button shape="round" type='primary' onClick={() => navigate(`/createPostType`,{ state: { id: props.communityID }})}> Create Post Type</Button>
            </Col>
            <Col span={24} align="middle">
                <Button shape="round" type='primary' onClick={() => navigate(`/createPost`,{ state: { id: props.communityID }})}> Create Post</Button>
            </Col>
        </div>
     );
}
 
export default AboutCommunity;