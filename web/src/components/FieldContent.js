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

  console.log(props)

  const renderContentTypeSwitch = () => {
    switch (props.fieldContent.type) {
      case 'text':
        return <>
        <Space size={'small'} align="start">
          <strong>{props.fieldContent.title}</strong>
          {props.fieldContent.content}
          </Space>
        </>
      case 'number':
        return <>
        <Space size={'small'} align="start">
          <strong>{props.fieldContent.title}</strong>
          {props.fieldContent.content}
          </Space>
        </>
      case 'imageURL':
        return <>
        <Space size={'small'} align="start">
          <strong>{props.fieldContent.title}</strong>
          <Image
          width={300}
          src={props.fieldContent.content}
        />
        </Space>
        </>
      case 'location':
        return <>
        <Space size={'small'} align="start">
        <strong>{props.fieldContent.title}</strong>
          {props.fieldContent.content}
        </Space>
          
        </>
      case 'date':
        return <>
          <Space size={'small'} align="start">
            <strong>{props.fieldContent.title}</strong>
            {props.fieldContent.content}
          </Space>
          </>
      case 'link':
        return <>
        <Space size={'small'} align="start">
        <strong>{props.fieldContent.title}</strong>
          <a href={props.fieldContent.content} target="_blank">{props.fieldContent.content}</a>
        </Space>
        </>
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