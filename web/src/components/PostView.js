import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Row, Col, Button, Typography, Space, Avatar } from 'antd';
import '../App.css';
import FieldContent from './FieldContent';


import React from "react";

import { LikeOutlined, LikeFilled, CommentOutlined, FlagOutlined, FlagFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Text } = Typography;

const PostView = (props) => {

  const navigate = useNavigate()

  props.postObj.postType = {
    color: '#6e74dc',
    name: 'Post Type',
    id: ''
  }

  let contentFields = [];

  contentFields.push(... props.postObj.textFieldNames.map((fieldContent) => {
    fieldContent.type = 'text';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(... props.postObj.numberFieldNames.map((fieldContent) => {
    fieldContent.type = 'number';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(... props.postObj.dateFieldNames.map((fieldContent) => {
    fieldContent.type = 'date';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(... props.postObj.linkFieldNames.map((fieldContent) => {
    fieldContent.type = 'link';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(... props.postObj.locationFieldNames.map((fieldContent) => {
    fieldContent.type = 'location';
    return <FieldContent fieldContent={fieldContent} />
  }))

  let postTypeStyle = {
    backgroundColor: props.postObj.postType.color,
    color: '#ffffff',
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

  const getPost = (communityId, postId) => {
    console.log(`Trying to open post information, send GET request to /communities/${communityId}/posts/${postId}`);
    navigate(`/communities/${communityId}/posts/${postId}`)
  }

  const getUser = (userId) => {
    console.log(`Trying to open user profile, send GET request to users/${userId}`)
    navigate(`/profiles/${userId}`)
  }

  const getCommunity = (communtiyId) => {
    console.log(`Trying to open community, send GET request to communitites/${communtiyId}`)
    navigate(`/communities/${communtiyId}`)
  }

  const getPostType = (postTypeId) => {
    console.log(`Trying to open posts with data types, send GET request to posts/?postType=${postTypeId}`)
    //navigate(`/post-types/detail/${postTypeId}`)
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

              <Avatar size={50} style={{cursor: 'pointer'}} src={props.postObj.user.profilePhotoUrl} onClick={() => getUser(props.postObj.user.id)} />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Space size={'large'}>
                    <h3><strong
                      onClick={() => getPost(props.postObj.community.id, props.postObj.id)}
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
                        onClick={() => getUser(props.postObj.user.id)}
                        style={{ cursor: 'pointer' }}>
                        {props.postObj.user.username}
                      </strong>
                    </Space>
                    <Space size={'small'}>
                      • Posted in
                      <strong
                        onClick={() => getCommunity(props.postObj.community.id)}
                        style={{ cursor: 'pointer' }}>
                        {props.postObj.community.name}
                      </strong>
                    </Space>
                    • {props.postObj.date} • 
                    <strong
                      style={postTypeStyle}
                      onClick={() => getPostType(props.postObj.postType.id)}>
                      {props.postObj.postType.name}
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
            <Button type="text" icon={<CommentOutlined />} onClick={() => getPost(props.postObj.community.id, props.postObj.id)}></Button>
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

export default PostView