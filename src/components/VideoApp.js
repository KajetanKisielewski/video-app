import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from './NavBar';

const VideoApp = () => {
    console.log('videoApp component');

    return (
        <Container fluid>
            <Row className="header">
                <Col>
                    <NavBar />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoApp;
