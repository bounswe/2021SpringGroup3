import React, { useState } from 'react';
import { Row, Col, Typography, Input, Button } from 'antd';

const Confirmation = () => {

    const [confirmationCode, setConfirmationCode] = useState('')

    const handleConfirmationSend = () => {
        console.log("Confirmation code sent: ", confirmationCode);
    }

    const handleCodeResend = () => {
        console.log("Confirmation code resend requested.");
    }
    
    return( 
        <div>
            <Row gutter={[0, 16]}>
                <Col span={24}></Col>
                <Col span={8} offset={8} align="middle">
                    <Typography strong="true">Enter confirmation code below:</Typography>
                    <Input 
                        placeholder="Confirmation Code"
                        value={confirmationCode}
                        onChange={e => setConfirmationCode(e.target.value)}/> 
                </Col>
                <Col span={24} align="middle">
                    <Button type="primary" shape="round" onClick={handleConfirmationSend}>
                        Send Confirmation Code
                    </Button>
                </Col>
                <Col span={24} align="middle" onClick={handleCodeResend}>
                    <Button type="link">
                        Did not receive the code? 
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
 
export default Confirmation;