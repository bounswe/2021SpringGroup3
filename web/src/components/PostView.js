import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Button, Typography, Space, Avatar, notification, Tag, Popover, message, Popconfirm } from 'antd';
import '../App.css';
import FieldContent from './FieldContent';
import { LikePost as LikePostRequest, UnlikePost as UnlikePostRequest} from '../utils/helper';

import { LikeOutlined, LikeFilled, CommentOutlined, FlagOutlined, FlagFilled, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { SearchWikidata as SearchWikidataRequest } from '../utils/helper';
import { DeletePost as DeletePostRequest } from '../utils/helper';


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

  const [likeCount, setLikeCount] = useState(props.postObj.likeCount);
  const [isLiked, setLiked] = useState(props.postObj.isLiked)
  const [tagDefinition, setTagDefinition] = useState('')

  const likePost = async (likedPostId) => {
    console.log(`Trying to like post, send a POST request to posts/${likedPostId}/likes`);
    
    try {
      let body = { postId: likedPostId, communityId: props.postObj.community.id }
      const result = await LikePostRequest(body, loginState.token, dispatch);
      notification.success({
          message: 'Liked post.'
      });
    } catch (err) {
        notification.error({
            message: `An error occured.`,
        });
    }

    setLikeCount(likeCount + 1);
    setLiked(true);
  }

  const revertLikePost = async (likedPostId) => {
    console.log(`Trying to revert the like on a post, send a DELETE request to posts/${likedPostId}/likes`);

    console.log(props.postObj.community.id);

    try {
      let body = { postId: likedPostId, communityId: props.postObj.community.id }
      const result = await UnlikePostRequest(body, loginState.token, dispatch);
      notification.success({
          message: 'Disliked post.'
      });
    } catch (err) {
        notification.error({
            message: `An error occured.`,
        });
    }

    setLikeCount(likeCount - 1);
    setLiked(false)
  }

  const getPost = (communityId, postId) => {
    navigate(`/communities/${communityId}/posts/${postId}`)
  }

  const getUser = (userId, username) => {
    if (username === loginState.username) {
      navigate(`/profile`)
    } else {
      navigate(`/profiles/${userId}`)
    }
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

  const deletePost = async () => {
    try {
        let body = { postId: props.postObj.id }
        const result = await DeletePostRequest(body, loginState.token, dispatch);
        notification.success({
            message: `Deleted post.`,
        });
        navigate('/home')
    } catch (err) {
        message.error('An error occured');
    }
  }

  return (
    <>
      <Card size="small" style={postCardStyle}>
        <Row>
        <Col span={22}>
          <Space size={'middle'}>
            <Col>
              <Avatar size={50} style={{ cursor: 'pointer' }} src={props.postObj.user.profilePhotoUrl} onClick={() => getUser(props.postObj.user.id, props.postObj.user.username)} />
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
                        onClick={() => getUser(props.postObj.user.id, props.postObj.user.username)}
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
          </Col>
          <Col span={2} align="right">
            {(props.postObj.user.username == loginState.username || props.isModerator ) &&                 
            <Popconfirm
                    icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                    placement="left"
                    title={`Are you sure that you want to delete this post?`}
                    onConfirm={() => deletePost()}
                    okText="Confirm Delete"
                    cancelText="Cancel"
                >
                    <Button type='primary' shape="circle" style={{ borderColor: "red", backgroundColor: "red" }} icon={<DeleteOutlined />}>
                    </Button>
                </Popconfirm>}
          </Col>
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
            {!isLiked ?
              <Button type="text" icon={<LikeOutlined />} onClick={() => likePost(props.postObj.id)}></Button> :
              <Button type="text" icon={<LikeFilled />} onClick={() => revertLikePost(props.postObj.id)}></Button>
            }
            {likeCount} Likes
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