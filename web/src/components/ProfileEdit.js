import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Typography, Row, Col, Switch, DatePicker, Upload, Avatar, message } from 'antd';
import 'antd/dist/antd.css';

import { TeamOutlined, LockOutlined, SaveOutlined, UserOutlined, CheckOutlined, CloseOutlined, UploadOutlined} from '@ant-design/icons';

import buttonColor from '../colors'
import { PostProfileSettings as PostProfileSettingsRequest} from '../utils/helper';

import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;

const { Text, Title } = Typography;
const { TextArea } = Input;

const ProfileEdit = (props) => {

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
      <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitute:</label><input type='text' value={location.lat} disabled/>
      <label>Longitute:</label><input type='text' value={location.lng} disabled/>
      <label>Zoom:</label><input type='text' value={zoom} disabled/>
      
      <MapPicker defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{height:'700px'}}
        onChangeLocation={handleChangeLocation} 
        onChangeZoom={handleChangeZoom}
        apiKey='AIzaSyBT4whK0_2fcQEvS_u2nmnvOXZH_9sAuzE'/>
    </div>
  
  var profileBody = {
    "profilePhoto": {
      "value": '',
      "isPublic": false
    },
    "bio": {
      "value": "",
      "isPublic": false
    },
    "birthday": {
      "value": "",
      "isPublic": false
    },
    "location": {
      "value": {
        "latitude": 3.435345,
        "longitude": 3.435345
      },
      "isPublic": false,
      "description": "text"
    }
  }

  const onFinish = async (values) => {

    profileBody.profilePhoto.isPublic = values.isProfilePicturePublic == true;

    profileBody.bio.value = values.bio;
    profileBody.bio.isPublic = values.isBioPublic == true;

    profileBody.birthday.value = values.birthday;
    profileBody.birthday.isPublic = values.isBirthdayPublic == true;

    profileBody.location.isPublic = values.isLocationPublic == true;

    await PostProfileSettingsRequest(profileBody, loginState.token, dispatch);

    console.log('Success:', profileBody);
    navigate('/profile');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}></Col>
      <Col span={12} offset={6}>
        <Row>
          <Col span={12}>
            <Title level={4}>Profile Settings</Title>
          </Col>
          <Col span={11} offset={1}>
            <Title level={4}>Privacy Settings</Title>
          </Col>
        </Row>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Text strong>Profile Picture</Text>
            <Col span={12}>
              <Form.Item
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              >
                <Upload 
                  name="pp" 
                  beforeUpload={file => {
                    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJpgOrPng) {
                      message.error('You can only upload JPG/PNG file!');
                    }
                    else{
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
              
                      reader.onload = e => {
                          console.log(e);
                          profileBody.profilePhoto.value = e.target.result.substring(e.target.result.indexOf('base64') + 7);
                          console.log(profileBody);
                      };
                    }
                    // Prevent upload
                    return false;
                  }}
                  listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="isProfilePicturePublic" valuePropName="checked">
                <Switch style={buttonColor}
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12} >
              <Text strong>Username</Text>
              <Form.Item
                name="username"
                initialValue={props.profileValues.username}
                required
                rules={[
                  {
                    required: true,
                    message: 'Please enter your username',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Text strong>Bio</Text>
              <Form.Item 
                name="bio"
                required
              >
                <TextArea rows={4} placeholder="Enter bio" />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isBioPublic" valuePropName="checked">
                <Switch style={buttonColor}
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Text strong>Birthday</Text>

                <DatePicker />

            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isBirthdayPublic" valuePropName="checked">
                <Switch style={buttonColor}
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Text strong>Location</Text>
              <Form.Item 
                name="location"
                required
                initialValue={props.profileValues.location}  
              >
                
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isLocationPublic" valuePropName="checked">
                <Switch style={buttonColor}
                  checkedChildren={<TeamOutlined />}
                  unCheckedChildren={<LockOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row>
            <Col span={12}>
              <Text>Other users must send me a request to follow my profile</Text>
            </Col>
            <Col span={11} offset={1}>
              <Form.Item name="isProfilePublic" valuePropName="checked">
                <Switch style={buttonColor}
                  checkedChildren={<CheckOutlined  />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" shape="round" icon={<SaveOutlined />} style={buttonColor}>
              Save Profile
            </Button>
          </Form.Item>
          
        </Form>
      </Col>
    </Row>
    
  );
}

export default ProfileEdit;