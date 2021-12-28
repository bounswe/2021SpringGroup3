import { Row, Col, Card, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router';

const CommentView = (props) => {

    const navigate = useNavigate();

    let postCardStyle = {
        width: '100%',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px'
    }

    const getUser = (userId) => {
        console.log(`Trying to open user profile, send GET request to users/${userId}`)
        navigate(`/profiles/${userId}`)
    }

    return ( 
        <>
            <Card size="small" style={postCardStyle}>
                <Row>
                    <Space size={"middle"}>
                        <Col>
                            <Avatar size={35} style={{cursor: "pointer"}} src={props.comment.user.profilePhotoUrl} onClick={() => getUser(props.comment.user.id)}/>
                        </Col>
                        <Col>
                            {props.comment.user.username}:
                        </Col>
                        <Col>
                            {props.comment.text}
                        </Col>
                    </Space>
                </Row>
            </Card>
        </>
     );
}
 
export default CommentView;