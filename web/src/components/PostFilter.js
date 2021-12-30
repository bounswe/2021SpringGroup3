import React, { useState, useEffect } from "react";

import { Layout, Button, Col, Row, Tabs, Typography, Space, Form, message, Input, Card, Radio, Checkbox, Tooltip, DatePicker, InputNumber } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

import GetPostTypes from '../components/GetPostTypes';
import PostView from '../components/PostView';
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { GetCommunityPosts as GetCommunityPostsRequest } from "../utils/helper";
import { SearchCommunityPosts as SearchCommunityPostsRequest } from "../utils/helper";
import { AdvancedSearch as AdvancedSearchRequest } from "../utils/helper";
import { GetPostTypeDetail as GetPostTypeDetailRequest } from '../utils/helper';

import MapPicker from 'react-google-map-picker'

const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

const DefaultLocation = { lat: 41, lng: 29 };
const DefaultZoom = 10;

const buttonStyle = {
    backgroundColor: '#6f74dd',
    borderColor: '#6f74dd',
    color: '#ffffff',
    cursor: 'pointer',
    marginTop: '3px',
    marginBottom: '3px',
    fontWeight: 'bold'
}

const cancelButtonStyle = {
    backgroundColor: '#ffffff',
    borderColor: '#6f74dd',
    color: '#6f74dd',
    cursor: 'pointer',
    marginTop: '3px',
    marginBottom: '3px'
}

const postCardStyle = {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: '20px'
}

function PostFilter(props) {

    const [textFieldsNames, setTextFieldsNames] = useState([]);
    const [numberFieldsNames, setNumberFieldsNames] = useState([]);
    const [linkFieldsNames, setLinkFieldsNames] = useState([]);
    const [dateFieldsNames, setDateFieldsNames] = useState([]);
    const [locationFieldsNames, setLocationFieldsNames] = useState([]);

    const [textFields, setTextFields] = useState([]);
    const [numberFields, setNumberFields] = useState([]);
    const [linkFields, setLinkFields] = useState([]);
    const [dateFields, setDateFields] = useState([]);
    const [locationFields, setLocationFields] = useState([]);

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

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)
    const [filters, setFilters] = useState({});
    const [postTypes, setPostTypes] = useState(<></>);
    const [sortIndex, setSortIndex] = useState(0);
    const [locationsUsed, setLocationsUsed] = useState([]);

    useEffect(() => {
        if (id) {
            setPostTypes(
                <>
                    <Col span={24}>
                        <Text><b>Filter by Post Type</b></Text>
                    </Col>
                    <GetPostTypes id={id} onSelectPostType={handlePostTypeChange} />
                </>
            )
        }
    }, [id])

    const onFilter = async (values) => {
        try {
            if (isAdvancedSearch) {
                // --- ADVANCED SEARCH FILTER --------------------------------------------------------------
                let body = {
                    communityId: id,
                    postTypeId: filters.postTypeId,
                    textFields: [],
                    numberFields: [],
                    linkFields: [],
                    dateFields: [],
                    locationFields: []
                }

                if (values.tag) body.tag = values.tag;

                if (!body.postTypeId && !body.tag) {
                    GetCommunityPostsRequest({ id: id, sortBy: values.sortBy, token: loginState.token }, dispatch)
                        .then(posts => {
                            props.onSelectFilters(posts.data.map((post) => {
                                return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
                            }))
                        })
                    message.success('All posts returned');
                    return
                }

                console.log(values)

                for (let key of Object.keys(values)) {
                    if (textFieldsNames.includes(key)) {
                        if (values[key]) body.textFields.push({ name: key, value: values[key] });
                    } else if (numberFieldsNames.includes(key.replace('__min__', ''))) {
                        if (values[key]) body.numberFields.push({ name: key.replace('__min__', ''), value: { start: values[key], end: values[key.replace('__min__', '__max__')] } });
                    } else if (linkFieldsNames.includes(key)) {
                        if (values[key]) body.linkFields.push({ name: key, value: values[key] });
                    } else if (dateFieldsNames.includes(key)) {
                        if (values[key]) body.dateFields.push({ name: key, value: { start: values[key][0] ? values[key][0]._d : '', end: values[key][1] ? values[key][1]._d : '' } });
                    } else if (locationFieldsNames.includes(key)) {
                        console.log(values[`${key}__isUsed__`])
                        if (location.lng && values[`${key}__isUsed__`]) {
                            body.locationFields.push({ name: key, value: { geo: { longitude: location.lng, latitude: location.lat, range: values[`${key}__range__`] * 1000 || 10000 } } })
                        }
                    }
                }

                console.log(body)
                const posts = await AdvancedSearchRequest(body, loginState.token, dispatch);
                if (!posts.data || posts.data.length < 1) {
                    message.warning('No posts found for given filters');
                    return
                }
                props.onSelectFilters(posts.data.map((post) => {
                    return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
                }))
                message.success('Posts filtered');
            } else {
                // --- BASIC FILTER -----------------------------------------------------------------
                let body = { communityId: id }
                if (values.tag) body.tag = values.tag;
                if (values.sortBy) body.sortBy = values.sortBy;
                if (filters.postTypeId) body.postTypeId = filters.postTypeId;
                if (!body.postTypeId && !body.tag) {
                    GetCommunityPostsRequest({ id: id, sortBy: values.sortBy, token: loginState.token }, dispatch)
                        .then(posts => {
                            props.onSelectFilters(posts.data.map((post) => {
                                return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
                            }))
                        })
                    message.success('All posts returned');
                    return
                }
                const posts = await SearchCommunityPostsRequest(body, loginState.token, dispatch);
                if (!posts.data || posts.data.length < 1) {
                    message.warning('No posts found for given filters');
                    return
                }
                props.onSelectFilters(posts.data.map((post) => {
                    return <div style={{ marginBottom: '20px' }}><PostView postObj={post} /></div>
                }))
                message.success('Posts filtered');
            }
        } catch (err) {
            message.error('An error occured whie filtering');
        }
    }

    const onFilterFailed = async () => {
        message.error('An error occured whie filtering');
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

    const handlePostTypeChange = (selectedId) => {
        if (!selectedId) {
            resetFields();
            setFilters({ ...filters, postTypeId: '' });
            return
        }
        resetFields();
        setFilters({ ...filters, postTypeId: selectedId });
        GetPostTypeDetailRequest({ communityId: id, postTypeId: selectedId }, loginState.token, dispatch)
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
                                <Form.Item name={name}>
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
                                <Space size={"0px"}>
                                    <Form.Item name={`${name}__min__`}>
                                        <InputNumber style={{ width: '100%' }} placeholder={`Min ${name}`} />
                                    </Form.Item>
                                    <Form.Item name={`${name}__max__`}>
                                        <InputNumber style={{ width: '100%' }} placeholder={`Max ${name}`} />
                                    </Form.Item>
                                </Space>
                            </Col>
                        </Row>
                    )
                }))
                setLinkFields(result.data.linkFieldNames.map(name => {
                    return (
                        <Row key={name}>
                            <Col span={24}><Text strong>{name}</Text></Col>
                            <Col span={24}>
                                <Form.Item name={name}>
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
                                <Form.Item name={name}>
                                    <RangePicker style={{ width: '100%' }} renderExtraFooter={() => 'extra footer'} showTime />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                }))
                setLocationFields(result.data.locationFieldNames.map(name => {
                    return (
                        <Row key={name}>
                                <Space size='small'>
                                    <Text strong>{name}</Text>
                                    <Form.Item 
                                        name={`${name}__isUsed__`}
                                        valuePropName="checked"
                                        style={{ marginBottom: "0px" }}
                                    >
                                        <Checkbox></Checkbox>
                                    </Form.Item>
                                </Space>
                            <Col span={24}>
                                <Form.Item
                                    name={`${name}__range__`}
                                    style={{ marginBottom: "0px" }}
                                >
                                    <Input type="number" style={{ width: '50%' }} addonAfter={<Text>{"Km"}</Text>} placeholder={`${name} Search Range`} defaultValue={10} />
                                </Form.Item>
                                <Form.Item
                                    name={name}
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
        <div key={id}>
            <Card style={postCardStyle}>
                <Col offset={6} span={12} style={{ marginBottom: '10px' }}>
                    <Tooltip placement="top" title={'Advanced search allows you to search values of individual fields of a post type.'}>
                        <Checkbox onChange={() => { setIsAdvancedSearch(!isAdvancedSearch) }}>Advanced Search</Checkbox>
                    </Tooltip>
                </Col>

                <Col offset={6} span={12} align="middle">
                    {postTypes}
                </Col>

                <Form
                    name="basic"
                    onFinish={onFilter}
                    onFinishFailed={onFilterFailed}
                >
                    {filters.postTypeId && isAdvancedSearch &&
                        <Col offset={6} span={12}>
                            {textFields}
                            {numberFields}
                            {linkFields}
                            {dateFields}
                            {locationFields}
                        </Col>
                    }
                    <Form.Item
                        name="tag">
                        <Col offset={6} span={12} align="middle">
                            <Text><b>Filter by Tag</b></Text>
                            <Input placeholder="Tag" />
                        </Col>
                    </Form.Item>

                    <Col offset={6} span={12} align="middle">
                        <Text><b>Sort Posts by</b></Text>
                    </Col>
                    <Form.Item
                        name="sortBy">
                        <Col offset={6} span={12} align="middle">
                            <Radio.Group>
                                <Radio.Button value="createdAt" buttonStyle="solid" onChange={() => setSortIndex(0)} style={sortIndex === 0 ? buttonStyle : cancelButtonStyle}>New</Radio.Button>
                                <Radio.Button value="likeCount" buttonStyle="solid" onChange={() => setSortIndex(1)} style={sortIndex === 1 ? buttonStyle : cancelButtonStyle}>Liked</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Form.Item>
                    <Form.Item>
                        <Col offset={6} span={12} align="middle">
                            <Button style={buttonStyle} icon={<FilterOutlined />} type="primary" shape="round" htmlType="submit">
                                Apply Filters
                            </Button>
                        </Col>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default PostFilter;