import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, Avatar } from 'antd';
import '../App.css';
import FieldContent from './FieldContent';


import React from "react";

import { LikeOutlined, LikeFilled, CommentOutlined, FlagOutlined, FlagFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Text } = Typography;

const Post = (props) => {

  console.log(props)

  let contentFields = props.postObj.fieldContents.map((fieldContent) => {
    return <FieldContent fieldContent={fieldContent} />
  })

  let dataTypeStyle = {
    backgroundColor: props.postObj.dataType.color,
    paddingLeft: '8px',
    paddingRight: '8px',
    borderRadius: '20px',
    cursor: 'pointer',
    marginButtom: '8px'
  }

  let postCardStyle = {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '20px'
  }

  const [isLiked, setLiked] = useState(props.postObj.isLiked)

  const likePost = (postId) => {
    console.log(`Trying to like post, send a POST request to posts/${postId}/likes`);
    setLiked(true)
  }

  const revertLikePost = (postId) => {
    console.log(`Trying to revert the like on a post, send a DELETE request to posts/${postId}/likes`);
    setLiked(false)
  }

  const getPost = (postId) => {
    console.log(`Trying to open post information, send GET request to post/${postId}`);
  }

  const getUser = (userId) => {
    console.log(`Trying to open user profile, send GET request to users/${userId}`)
  }

  const getCommunity = (communtiyId) => {
    console.log(`Trying to open community, send GET request to communitites/${communtiyId}`)
  }

  const getDataType = (dataTypeId) => {
    console.log(`Trying to open posts with data types, send GET request to posts/?dataType=${dataTypeId}`)
  }

  const reportPost = (postId) => {
    console.log(`Trying to report post, open post report selection component with ${postId}`)
  }

  return (
    <>
      <Card size="small" style={postCardStyle}>
        <Row>
          <Space size={'middle'}>
            <Col>

              <Avatar size={50} style={{cursor: 'pointer'}} src={props.postObj.profilePicture} onClick={() => getUser(props.postObj.userId)} />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Space size={'large'}>
                    <h3><strong
                      onClick={() => getPost(props.postObj.id)}
                      style={{ cursor: 'pointer' }}>
                      {props.postObj.title}
                    </strong></h3>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Space size={'small'}>
                    <Space size={'small'}>
                      Posted by
                      <strong
                        onClick={() => getUser(props.postObj.userId)}
                        style={{ cursor: 'pointer' }}>
                        {props.postObj.username}
                      </strong>
                    </Space>
                    <Space size={'small'}>
                      • Posted in
                      <strong
                        onClick={() => getCommunity(props.postObj.communityId)}
                        style={{ cursor: 'pointer' }}>
                        {props.postObj.communityName}
                      </strong>
                    </Space>
                    • {props.postObj.createdAt}ago • 
                    <strong
                      style={dataTypeStyle}
                      onClick={() => getDataType(props.postObj.dataType.id)}>
                      {props.postObj.dataType.name}
                    </strong>
                  </Space>
                </Col>
              </Row>

            </Col>
          </Space>
        </Row>
        <Row>
          <Card size="small" style={{ width: '100%', borderRadius: '10px', borderColor: '#ffffff', marginTop: "10px", marginBottom: "10px"}}>
            <Space direction="vertical">
              {contentFields}
            </Space>
          </Card>
        </Row>
        <Row>
          <Col span={8} align="middle">
            {isLiked ?
              <Button type="text" icon={<LikeOutlined />} onClick={() => likePost(props.postObj.id)}></Button> :
              <Button type="text" icon={<LikeFilled />} onClick={() => revertLikePost(props.postObj.id)}></Button>
            }
            {props.postObj.likeCount} Likes
          </Col>

          <Col span={8} align="middle">
            <Button type="text" icon={<CommentOutlined />} onClick={() => getPost(props.postObj.communityId)}></Button>
            {props.postObj.commentCount} Comments
          </Col>

          <Col span={8} align="middle">
            <Button type="text" icon={<FlagOutlined />} onClick={() => reportPost(props.postObj.id)}></Button>
            Report
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Post