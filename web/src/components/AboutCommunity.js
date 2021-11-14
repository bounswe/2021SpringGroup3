import React from 'react';
import { Descriptions } from 'antd';

import 'antd/dist/antd.css';

const AboutCommunity = (props) => {
    return ( 
        <div style={{width: "20vw"}}>
            <Descriptions layout="vertical" bordered size="small" column={1}>
                <Descriptions.Item label="About Community">{props.description}</Descriptions.Item>
                <Descriptions.Item label="Members">{props.members === undefined ? "No members" : props.members + "people"}</Descriptions.Item>
                <Descriptions.Item label="Created in">{props.created}</Descriptions.Item>
            </Descriptions>
        </div>
     );
}
 
export default AboutCommunity;