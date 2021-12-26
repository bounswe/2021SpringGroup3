import PropTypes from 'prop-types';
import { useState } from 'react';
import { Typography, Space, Image, Col } from 'antd';
import '../App.css';

import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

import React from "react";

import 'antd/dist/antd.css';

import { Anchor } from 'antd';

const { Link } = Anchor;

const { Text } = Typography;

const FieldContent = (props) => {

  const renderContentTypeSwitch = () => {

    switch (props.fieldContent.type) {
      case 'text':
        return <>
          <Space size={'small'} align="start">
            <strong>{props.fieldContent.name}</strong>
            {props.fieldContent.value}
          </Space>
        </>
      case 'number':
        return <>
          <Space size={'small'} align="start">
            <strong>{props.fieldContent.name}</strong>
            {props.fieldContent.value}
          </Space>
        </>
      // case 'imageURL':
      //   return <>
      //   <Space size={'small'} align="start">
      //     <strong>{props.fieldContent.name}</strong>
      //     <Image
      //     width={300}
      //     src={props.fieldContent.value}
      //   />
      //   </Space>
      //   </>
      case 'location':
        function Map() {
          return (
            <GoogleMap
              defaultZoom={10}
              defaultCenter={{ lat: props.fieldContent.value.geo.latitude, lng: props.fieldContent.value.geo.longitude }}
            >
              <Marker
                key={props.fieldContent.name}
                position={{ lat: props.fieldContent.value.geo.latitude, lng: props.fieldContent.value.geo.longitude }}
              />
            </GoogleMap>
          )
        }
        const WrappedMap = withScriptjs(withGoogleMap(Map));
        return (
          <>
            <Col span={24}>
              <strong>{props.fieldContent.name}</strong>
            </Col>
            <Col span={24}>
              <div style={{ height: "120px", width: "500px" }}>
                <WrappedMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`}
                  loadingElement={<div style={{ height: "100%" }}></div>}
                  containerElement={<div style={{ height: "100%" }}></div>}
                  mapElement={<div style={{ height: "100%" }}></div>}
                />
              </div>
            </Col>
          </>
        )
      case 'date':
        const date = new Date(props.fieldContent.value);
        const dateTimeFormat = new Intl.DateTimeFormat('en', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        return <>
          <Space size={'small'} align="start">
            <strong>{props.fieldContent.name}</strong>
            {dateTimeFormat.format(date)}
          </Space>
        </>
      case 'link':
        if (props.fieldContent.value.slice(-4) == 'jpeg' || props.fieldContent.value.slice(-3) == 'png' || props.fieldContent.value.slice(-3) == 'jpg') {
          return <>
            <Space size={'small'} align="start">
              <strong>{props.fieldContent.name}</strong>
              <Image
                width={300}
                src={props.fieldContent.value}
              />
            </Space>
          </>
        } else {
          return <>
            <Space size={'small'} align="start">
              <strong>{props.fieldContent.name}</strong>
              <a href={props.fieldContent.value} target="_blank">{props.fieldContent.value}</a>
            </Space>
          </>
        }
      default:
        return <></>
    }
  }

  return (
    <>
      {renderContentTypeSwitch()}
    </>
  )
}

export default FieldContent