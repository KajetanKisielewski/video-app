import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import '../styles/videoApp.css';

const VideoApp = () => {
    console.log('videoApp component');

    return (
        <Container fluid>
            <Row className="header">
                <Col className="header__col">
                    <NavBar />
                    <SearchBar />
                </Col>
            </Row>
            <Row className="main">
                <Col>
                    <SearchResult />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoApp;
