import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Button, Typography, Space, Avatar, Tag, Popover } from 'antd';
import '../App.css';
import FieldContent from './FieldContent';
import { LikeOutlined, LikeFilled, CommentOutlined, FlagOutlined, FlagFilled } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { SearchWikidata as SearchWikidataRequest } from '../utils/helper';

const { Text } = Typography;

const PostView = (props) => {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let contentFields = [];

  contentFields.push(...props.postObj.textFieldNames.map((fieldContent) => {
    fieldContent.type = 'text';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(...props.postObj.numberFieldNames.map((fieldContent) => {
    fieldContent.type = 'number';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(...props.postObj.dateFieldNames.map((fieldContent) => {
    fieldContent.type = 'date';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(...props.postObj.linkFieldNames.map((fieldContent) => {
    fieldContent.type = 'link';
    return <FieldContent fieldContent={fieldContent} />
  }))

  contentFields.push(...props.postObj.locationFieldNames.map((fieldContent) => {
    fieldContent.type = 'location';
    return <FieldContent fieldContent={fieldContent} />
  }))

  let postTypeStyle = {
    backgroundColor: '#6f74dd',
    color: '#ffffff',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderRadius: '20px',
    marginButtom: '8px'
  }

  let postCardStyle = {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '20px'
  }

  const [isLiked, setLiked] = useState(props.postObj.isLiked)
  const [tagDefinition, setTagDefinition] = useState('')

  const likePost = (postId) => {
    console.log(`Trying to like post, send a POST request to posts/${postId}/likes`);
    setLiked(true)
  }

  const revertLikePost = (postId) => {
    console.log(`Trying to revert the like on a post, send a DELETE request to posts/${postId}/likes`);
    setLiked(false)
  }

  const getPost = (communityId, postId) => {
    navigate(`/communities/${communityId}/posts/${postId}`)
  }

  const getUser = (userId) => {
    navigate(`/profiles/${userId}`)
  }

  const getCommunity = (communtiyId) => {
    navigate(`/communities/${communtiyId}`)
  }

  const reportPost = (postId) => {
    console.log(`Trying to report post, open post report selection component with ${postId}`)
  }

  const defineTag = async (tag) => {
    const result = await SearchWikidataRequest({ tag: tag }, loginState.token, dispatch)
    if (result.data && result.data.length > 0) {
      setTagDefinition(result.data[0].description)
    } else  {
      setTagDefinition(`No definition found for ${tag.name}.`)
    }
    
  }

  const cancelTag = () => {
    setTagDefinition('')
  }

  return (
    <>
      <Card size="small" style={postCardStyle}>
        <Row>
          <Space size={'middle'}>
            <Col>

              <Avatar size={50} style={{ cursor: 'pointer' }} src={props.postObj.user.profilePhotoUrl} onClick={() => getUser(props.postObj.user.id)} />
            </Col>
            <Col>
              {/*<Row>
                <Col>
                  <Space size={'large'}>
                    <h3><strong
                      onClick={() => getPost(props.postObj.community.id, props.postObj.id)}
                      style={{ cursor: 'pointer' }}>
                      {props.postObj.title}
                    </strong></h3>
                  </Space>
                </Col>
              </Row>*/}
              <Space direction='vertical'>
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
                    <strong style={postTypeStyle}>
                      <span>{props.postObj.postType}</span>
                    </strong>
                  </Space>
                </Col>
                <Space size='0px'>
                  {props.postObj.tags.map(tag => {
                    return (
                      <Popover content={tagDefinition} title={tag.name}>
                        <Tag
                          color="#6f74dd"
                          onMouseEnter={() => defineTag(tag)}
                          onMouseLeave={() => cancelTag()}
                          style={{ cursor: 'pointer' }}>
                          {tag.name}
                        </Tag> </Popover>
                    )
                  })
                  }
                </Space>
              </Space>
            </Col>
          </Space>
        </Row>
        <Row>
          <Card size="small" style={{ width: '100%', borderRadius: '10px', borderColor: '#ffffff', marginTop: "10px", marginBottom: "10px" }}>
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