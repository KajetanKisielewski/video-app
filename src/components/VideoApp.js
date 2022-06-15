/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import '../styles/videoApp.css';

const VideoApp = () => {
    const [url, setUrl] = React.useState('');

    return (
        <Container fluid>
            <Row className="header">
                <Col className="header__col">
                    <NavBar />
                    <SearchBar setUrl={setUrl} />
                </Col>
            </Row>
            <Row className="main">
                <Col>
                    <SearchResult url={url} />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoApp;
