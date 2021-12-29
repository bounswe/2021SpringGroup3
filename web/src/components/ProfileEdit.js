import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Space, Typography, Row, Col, Switch, DatePicker, Upload, Avatar, message, notification } from 'antd';
import 'antd/dist/antd.css';

import { TeamOutlined, LockOutlined, SaveOutlined, UserOutlined, CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';

import buttonColor from '../colors'
import base64avatar from '../utils/images'
import { PostProfileSettings as PostProfileSettingsRequest } from '../utils/helper';

import MapPicker from 'react-google-map-picker'
import moment from 'moment'

const { Text, Title } = Typography;
const { TextArea } = Input;

require('dotenv').config();

const ProfileEdit = (props) => {

  const DefaultLocation = (props.profileValues.location && props.profileValues.location.value)
    ? { lat: props.profileValues.location.value.latitude, lng: props.profileValues.location.value.longitude }
    : { lat: 41, lng: 29 };
  const DefaultZoom = 10;

  console.log(props)

  const buttonStyle = {
    backgroundColor: '#6f74dd',
    borderColor: '#6f74dd',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '20px',
    fontWeight: 'bold'
  }

  const loginState = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPublicProfilePhoto, setisPublicProfilePhoto] = useState(props.profileValues.profilePhotoUrl ? props.profileValues.profilePhotoUrl.isPublic : true)
  const [isPublicBio, setisPublicBio] = useState(props.profileValues.bio ? props.profileValues.bio.isPublic : true)
  const [isPublicBirthday, setisPublicBirthday] = useState(props.profileValues.birthday ? props.profileValues.birthday.isPublic : true)
  const [isPublicLocation, setisPublicLocation] = useState(props.profileValues.location ? props.profileValues.location.isPublic : true)
  const [isPublicProfile, setisPublicProfile] = useState(props.profileValues.isPublic)

  const [image64, setImage64] = useState(null);

  //react-map-picker
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }
  const MapPickerElement =
    <div>
      <MapPicker defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: '300px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} />
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
    try {
      profileBody.profilePhoto.value = image64;
      if (!profileBody.profilePhoto.value) profileBody.profilePhoto.value = base64avatar;
      profileBody.profilePhoto.isPublic = isPublicProfilePhoto == true;

      profileBody.bio.value = values.bio;
      profileBody.bio.isPublic = isPublicBio == true;

      profileBody.birthday.value = values.birthday._d;
      profileBody.birthday.isPublic = isPublicBirthday == true;

      profileBody.location.value.latitude = location.lat;
      profileBody.location.value.longitude = location.lng;
      profileBody.location.isPublic = isPublicLocation == true;

      //profileBody.isPublic = isPublicProfile == true;
      await PostProfileSettingsRequest(profileBody, loginState.token, dispatch);

      console.log('Success:', profileBody);
      navigate('/profile');
    } catch (err) {
      notification.error({
        message: `Please fill all the inputs.`,
      });
    }

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
        <Col span={24} align='middle'>
          <Title level={2} strong="true">{`${props.profileValues.username}'s Settings`}</Title>
        </Col>
        <Row style={{ marginTop: '30px' }}>
          <Col span={12}>
            <Title level={4}>Profile Settings</Title>
          </Col>
          <Col span={11} offset={1} align='left'>
            <Title level={4}>Privacy Settings</Title>
          </Col>
        </Row>

        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>

            <Col span={12}>
              <Col span={24}><Text strong>Profile Picture</Text></Col>
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
                    else {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);

                      reader.onload = e => {
                        console.log(e);
                        setImage64(e.target.result.substring(e.target.result.indexOf('base64') + 7));
                      };
                    }
                    // Prevent upload
                    return false;
                  }}
                  onRemove={() => { setImage64("") }}
                  listType="picture">
                  {image64 ? <></> : <Button icon={<UploadOutlined />}>Click to upload</Button>}
                </Upload>
              </Form.Item>
            </Col>
            <Col offset={1} span={11} align="left">
              <Form.Item name="isProfilePicturePublic">
                <Switch style={buttonColor}
                  checked={isPublicProfilePhoto}
                  checkedChildren={<><TeamOutlined /> <Text strong style={{ color: 'white' }}>Public</Text></>}
                  unCheckedChildren={<><LockOutlined /> <Text strong style={{ color: 'white' }}>Private</Text></>}
                  onClick={() => setisPublicProfilePhoto(!isPublicProfilePhoto)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Text strong>Bio</Text>
              <Form.Item name="bio" initialValue={props.profileValues.bio.value}>
                <TextArea rows={4} placeholder="Enter bio" />
              </Form.Item>
            </Col>
            <Col offset={1} span={11} align="left">
              <Form.Item name="isBioPublic">
                <Switch style={buttonColor}
                  checked={isPublicBio}
                  checkedChildren={<><TeamOutlined /> <Text strong style={{ color: 'white' }}>Public</Text></>}
                  unCheckedChildren={<><LockOutlined /> <Text strong style={{ color: 'white' }}>Private</Text></>}
                  onClick={() => setisPublicBio(!isPublicBio)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Text strong>Birthday</Text>
              <Form.Item name="birthday" initialValue={moment(props.profileValues.birthday.value)}>
                <DatePicker format="MMM Do YYYY" />
              </Form.Item>
            </Col>
            <Col offset={1} span={11} align="left">
              <Form.Item name="isBirthdayPublic">
                <Switch style={buttonColor}
                  checked={isPublicBirthday}
                  checkedChildren={<><TeamOutlined /> <Text strong style={{ color: 'white' }}>Public</Text></>}
                  unCheckedChildren={<><LockOutlined /> <Text strong style={{ color: 'white' }}>Private</Text></>}
                  onClick={() => setisPublicBirthday(!isPublicBirthday)}
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
                {MapPickerElement}
              </Form.Item>
            </Col>
            <Col offset={1} span={11} align="left">
              <Form.Item name="isLocationPublic">
                <Switch style={buttonColor}
                  checked={isPublicLocation}
                  checkedChildren={<><TeamOutlined /> <Text strong style={{ color: 'white' }}>Public</Text></>}
                  unCheckedChildren={<><LockOutlined /> <Text strong style={{ color: 'white' }}>Private</Text></>}
                  onClick={() => setisPublicLocation(!isPublicLocation)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Col span={24}>
                <Text strong>Follow Requests</Text>
              </Col>
              <Col span={24}>
                <Text>If you set your pofile to private, other users must send you a request to follow your profile to message you or to view your private information.</Text>
              </Col>
            </Col>
            <Col offset={1} span={11} align="left">
              <Form.Item name="isProfilePublic">
                <Switch style={buttonColor}
                  checked={isPublicProfile}
                  checkedChildren={<><TeamOutlined /> <Text strong style={{ color: 'white' }}>Public</Text></>}
                  unCheckedChildren={<><LockOutlined /> <Text strong style={{ color: 'white' }}>Private</Text></>}
                  onClick={() => setisPublicProfile(!isPublicProfile)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Col span={24} align='middle'>
              <Button type="primary" htmlType="submit" shape="round" icon={<SaveOutlined />} style={buttonStyle}>
                Save Profile
              </Button>
            </Col>
          </Form.Item>

        </Form>
      </Col>
    </Row>

  );
}

export default ProfileEdit;