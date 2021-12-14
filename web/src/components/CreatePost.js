import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Row, Col, Form, Input, Typography, Button, Radio, Select, DatePicker, Card, message } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import GetCommunities from './GetCommunities';
import GetPostTypes from './GetPostTypes';
import { CreatePost as CreatePostRequest } from '../utils/helper';
import { GetPostTypes as GetPostTypesRequest } from '../utils/helper';
import { GetPostTypeDetail as GetPostTypeDetailRequest } from '../utils/helper';
import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 41, lng: 29};
const DefaultZoom = 10;

const { Text, Title } = Typography;
const { Option } = Select;

const CreatePost = (props) => {
  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //react-map-picker
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }
  const MapPickerElement =                 
    <div>
      <button onClick={handleResetLocation}>Reset Location</button><br/>
      <label>Latitute:</label><input type='text' value={location.lat} disabled/><br/>
      <label>Longitute:</label><input type='text' value={location.lng} disabled/><br/>
      <label>Zoom:</label><input type='text' value={zoom} disabled/><br/>
      

      <MapPicker defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{height:'700px'}}
        onChangeLocation={handleChangeLocation} 
        onChangeZoom={handleChangeZoom}
        apiKey='AIzaSyBT4whK0_2fcQEvS_u2nmnvOXZH_9sAuzE'/>
    </div>

  const { communityId } = useParams();

  const postCardStyle = {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '20px'
  }

  const buttonStyle = {
    backgroundColor: '#6f74dd',
    borderColor: '#6f74dd',
    color: '#ffffff',
    cursor: 'pointer'
  }

  const [textFieldsNames, setTextFieldsNames] = useState([]);
  const [numberFieldsNames, setNumberFieldsNames] = useState([]);
  const [linkFieldsNames, setLinkFieldsNames] = useState([]);
  const [dateFieldsNames, setDateFieldsNames] = useState([]);
  const [locationFieldsNames, setLocationFieldsNames] = useState([]);

  const [postTypeId, setPostTypeId] = useState('');
  const [postTypes, setPostTypes] = useState(<></>);
  const [textFields, setTextFields] = useState([]);
  const [numberFields, setNumberFields] = useState([]);
  const [linkFields, setLinkFields] = useState([]);
  const [dateFields, setDateFields] = useState([]);
  const [locationFields, setLocationFields] = useState([]);

  const onFinish = async (values) => {
    console.log("Success: ", communityId, postTypeId);
    let body = {
      communityId: communityId,
      postTypeId: postTypeId,
      textFields: [],
      numberFields: [],
      linkFields: [],
      dateFields: [],
      locationFields: []
    }
    for (let key of Object.keys(values)) {
      if (textFieldsNames.includes(key)) {
        body.textFields.push({name: key, value: values[key]})
      } else if (numberFieldsNames.includes(key)) {
        body.numberFields.push({name: key, value: values[key]})
      } else if (linkFieldsNames.includes(key)) {
        body.linkFields.push({name: key, value: values[key]})
      } else if (dateFieldsNames.includes(key)) {
        body.dateFields.push({name: key, value: values[key]._d})
      } else if (locationFieldsNames.includes(key)) {
        body.locationFields.push({description: key, geo: {longitude: location.lng, latitude: location.lat}})
      }
    }

    console.log(body)
    const result = await CreatePostRequest({ body: body, token: loginState.token }, dispatch);
    if (result && result.data) {
      navigate(`/communities/${result.data.community.id}/posts/${result.data.post.id}`)
    } else {
      navigate(`/communities/${communityId}`)
    }
  
  }

  const onFinishFailed = (error) => {
    console.log("Failed: ", error);
  }

  const resetFields = () => {
    setTextFields([]);
    setNumberFields([]);
    setLinkFields([]);
    setDateFields([]);
    setLocationFields([]);
    setTextFieldsNames([])
    setNumberFieldsNames([]);
    setLinkFieldsNames([]);
    setDateFieldsNames([]);
    setLocationFieldsNames([]);
  }

  useEffect(() => {
    if (communityId) {
      setPostTypes(
        <>
          <Col span={24}>
            <Text><b>Select Post Type to be Used</b></Text>
          </Col>
          <GetPostTypes id={communityId} onSelectPostType={handlePostTypeChange} />
        </>
      )
    }
  }, [communityId])


  const handleCommunityChange = (selectedId) => {
    setPostTypes(<></>);
    setPostTypeId('');
    resetFields();
    navigate(`/createPost/community/${selectedId}`);
  }

  const handlePostTypeChange = (selectedId) => {
    resetFields();
    setPostTypeId(selectedId);
    console.log('sdafasdfasdfdsa',communityId, selectedId)
    GetPostTypeDetailRequest({ communityId: communityId, postTypeId: selectedId, token: loginState.token }, dispatch)
      .then(result => {
        setTextFieldsNames([...result.data.textFieldNames]);
        setNumberFieldsNames([...result.data.numberFieldNames]);
        setLinkFieldsNames([...result.data.linkFieldNames]);
        setDateFieldsNames([...result.data.dateFieldNames]);
        setLocationFieldsNames([...result.data.locationFieldNames]);

        setTextFields(result.data.textFieldNames.map(name => {
          return (
            <Row>
              <Col span={24}><Text strong>{name}</Text></Col>
              <Col span={24}>
                <Form.Item
                  name={name}
                  required
                  rules={[{ required: true, message: `Please enter ${name}` }]}>
                  <Input.TextArea type='text' placeholder={`Enter ${name}`} />
                </Form.Item></Col>
            </Row>
          )
        }))
        setNumberFields(result.data.numberFieldNames.map(name => {
          return (
            <Row key={name}>
              <Col span={24}><Text strong>{name}</Text></Col>
              <Col span={24}>
                <Form.Item
                  name={name}
                  required
                  rules={[{ required: true, message: `Please enter ${name}` }]}>
                  <Input type='number' placeholder={`Enter ${name}`} />
                </Form.Item></Col>
            </Row>
          )
        }))
        setLinkFields(result.data.linkFieldNames.map(name => {
          return (
            <Row key={name}>
              <Col span={24}><Text strong>{name}</Text></Col>
              <Col span={24}>
                <Form.Item
                  name={name}
                  required
                  rules={[{ required: true, message: `Please enter ${name}` }]}>
                  <Input type='text' placeholder={`Enter ${name}`} />
                </Form.Item>
              </Col>
            </Row>
          )
        }))
        setDateFields(result.data.dateFieldNames.map(name => {
          return (
            <Row key={name}>
              <Col span={24}><Text strong>{name}</Text></Col>
              <Col span={24}>
                <Form.Item
                  name={name}
                  required
                  rules={[{ required: true, message: `Please enter ${name}` }]}>
                  <DatePicker format="MMM Do YY"/>
                </Form.Item>
              </Col>
            </Row>
          )
        }))
        setLocationFields(result.data.locationFieldNames.map(name => {
          return (
            <Row key={name}>
              <Col span={24}><Text strong>{name}</Text></Col>
              <Col span={24}>
                <Form.Item 
                  name="location"
                  required 
                >
                  {MapPickerElement}
                </Form.Item>
              </Col>
            </Row>
          )
        }))
      })
  }

  return (
    <Card size="small" style={postCardStyle}>
      <Row>
        <Col offset={8} span={8} style={{ marginTop: '20px' }} align="middle">
          <Col span={24}>
            <Text><b>Select Community to Post in</b></Text>
          </Col>
          <GetCommunities isCreatePost={true} onSelectCommunity={handleCommunityChange} />
        </Col>
        <Col offset={8} span={8} align="middle">
          {postTypes}
        </Col>
        <Col offset={8} span={8}>
          <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {textFields}
            {numberFields}
            {linkFields}
            {dateFields}
            {locationFields}
            <Col span={24} align='middle'>
              { postTypeId ?
                <Form.Item>
                <Button style={buttonStyle} type="primary" htmlType="submit" shape="round">
                  Create Post
                </Button>
                </Form.Item> : <></>
              }
            </Col>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}

export default CreatePost;