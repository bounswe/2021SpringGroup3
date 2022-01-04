import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Space, Avatar, Typography } from 'antd';
import '../App.css';

import 'antd/dist/antd.css';

import { GetHomePagePosts as GetHomePagePostsRequest } from "../utils/helper";
import { GetProfilePage as GetProfilePageRequest } from "../utils/helper";
import { GetProfileOtherPage as GetProfileOtherPageRequest } from "../utils/helper";

import { Anchor } from 'antd';

const { Link } = Anchor;

const { Text } = Typography;

const postCardStyle = {
  width: '100%',
  backgroundColor: '#f8f8f8',
  borderRadius: '20px'
}

const Notification = (props) => {

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = new Date(props.notfObj.createdAt);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  const [posts, setPosts] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    GetProfileOtherPageRequest({ token: loginState.token, id: props.notfObj.actor }, dispatch)
      .then(result => {
        console.log(result.data)
        setUser(result.data)
      })
  }, [])

  // useEffect(() => {
  //   GetHomePagePostsRequest(loginState.token, dispatch)
  //     .then(posts => {
  //       console.log(posts.data)
  //       setPosts(posts.data)
  //     })
  // }, [])

  const onClickCommunity = () => {
    navigate(`/communities/${props.notfObj.object}`)
  }

  const onClickPost = () => {
    //let post = posts.filter(p => p.id === props.notfObj.object)
    //navigate(`/communities/${post.communityId}/posts/${props.notfObj.object}`)
  }

  const onClickUser = () => {
    if (user.username === loginState.username) {
      navigate(`/profile`)
    } else {
      navigate(`/profiles/${props.notfObj.actor}`)
    }
  }

  const renderObjectTypeSwitch = () => {

    switch (props.notfObj.objectType) {
      case 'Community':
        return <>
          <Space style={{cursor: "pointer"}} onClick={() => onClickCommunity()} size={'small'} align="start">
            <Text>{props.notfObj.summary}</Text>
          </Space>
        </>
      case 'Post':
        return <>
          <Space style={{cursor: "pointer"}} onClick={() => onClickPost()} size={'small'} align="start">
            <Text>{props.notfObj.summary}</Text>
          </Space>
        </>
      case 'User':
        return <>
          <Space style={{cursor: "pointer"}} onClick={() => onClickUser()} size={'small'} align="start">
            <Text>{props.notfObj.summary}</Text>
          </Space>
        </>
      default:
        return <>
        <Space size={'small'} align="start">
          <Text >{props.notfObj.summary}</Text>
        </Space>
      </>
    }
  }

  return (
    <>
    { user &&
      <Card size="small" style={postCardStyle}>
        <Row>
          <Space size={"middle"}>
            <Col>
              <Avatar size={35} style={{ cursor: "pointer" }} src={ user.profilePhotoUrl || '' } onClick={() => onClickUser(props.notfObj.actor)} />
            </Col>
            <Space size={"0px"} direction="vertical">
              <Space size={"middle"}>
                <Text strong style={{ cursor: "pointer" }} onClick={() => onClickUser(props.notfObj.actor)}>{ user.username }</Text>
                <Text style={{ color: 'grey', fontSize: "12px" }}>{dateTimeFormat.format(date)}</Text>
              </Space>
              <Col>
                {renderObjectTypeSwitch()}
              </Col>
            </Space>
          </Space>
        </Row>
      </Card>
      }
    </>
  )
}

export default Notification