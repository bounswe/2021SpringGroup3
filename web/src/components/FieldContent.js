import PropTypes from 'prop-types';
import { useState } from 'react';
import { Typography, Space, Image } from 'antd';
import '../App.css';

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
        return <>
          <Space size={'small'} align="start">
            <strong>{props.fieldContent.name}</strong>
            {props.fieldContent.value.geo.longitude + ' ' + props.fieldContent.value.geo.latitude}
          </Space>

        </>
      case 'date':
        return <>
          <Space size={'small'} align="start">
            <strong>{props.fieldContent.name}</strong>
            {props.fieldContent.value}
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