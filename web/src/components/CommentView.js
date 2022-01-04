import { Row, Col, Card, Space, Avatar, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const { Text, Title } = Typography;

const CommentView = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();

    let postCardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const getUser = (userId, username) => {
        if (username === loginState.username) {
          navigate(`/profile`)
        } else {
          navigate(`/profiles/${userId}`)
        }
      }

    const date = new Date(props.comment.createdAt);
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
    
    props.comment.createdAt = dateTimeFormat.format(date)

    return ( 
        <>
            <Card size="small" style={postCardStyle}>
                <Row>
                    <Space size={"middle"}>
                        <Col>
                            <Avatar size={35} style={{cursor: "pointer"}} src={props.comment.user.profilePhotoUrl || ''} onClick={() => getUser(props.comment.user.id, props.comment.user.username)}/>
                        </Col>
                        <Space size={"0px"} direction="vertical">
                            <Space size={"middle"}>
                                <Text strong style={{cursor: "pointer"}} onClick={() => getUser(props.comment.user.id, props.comment.user.username)}>{props.comment.user.username}</Text>
                                <Text style={{color: 'grey', fontSize: "12px"}}>{props.comment.createdAt}</Text>
                            </Space>
                            <Col>
                                {props.comment.text}
                            </Col>
                        </Space>
                    </Space>
                </Row>
            </Card>
        </>
     );
}
 
export default CommentView;