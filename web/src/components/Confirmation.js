import React from 'react';
import { Row, Col, Typography, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';

const { Text } = Typography;

const Confirmation = () => {
    
    const onFinish = (values) => {
        console.log("Success: ", values)
    }

    const onFinishFailed = (error) => {
        console.log("Failed: ", error);
    }

    const handleCodeResend = () => {
        console.log("Confirmation code resend requested.");
    }

    return( 
        <div>
            <Row gutter={[0, 16]}>
                <Col span={24}></Col>
                <Col span={8} offset={8} align="middle">
                    <Form 
                        name="basic" 
                        onFinish={onFinish} 
                        onFinishFailed={onFinishFailed}
                    >
                    <Text strong="true">Enter your confirmation code below:</Text>
                        <Form.Item 
                            name="confirmationCode" 
                            rules={[
                                {
                                    required:true,
                                    message: "Please input your confirmation code!"
                                }
                            ]}
                        > 
                            <Input placeholder="Confirmation Code"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" shape="round" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24} align="middle">
                    <Button type="default" shape="round" onClick={handleCodeResend}>
                        Did not receive the code? 
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
 
export default Confirmation;