/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from './NavBar';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';

import useLocalStorage from '../hooks/useLocalStorage';

import videoReducer from '../reducer/videoReducer';

import '../styles/videoApp.css';
import useFetch from '../hooks/useFetch';

const VideoApp = () => {
    const [url, setUrl] = React.useState(null);
    const [getLocalStorage, setLocalStorage] = useLocalStorage();
    const [videos, dispatch] = React.useReducer(videoReducer, getLocalStorage() || []);

    console.log('v', videos);
    React.useEffect(() => {
        setLocalStorage(videos);
    }, [videos]);

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
                    <SearchResult url={url} dispatch={dispatch} videos={videos} />
                </Col>
            </Row>
        </Container>
    );
};

export default VideoApp;
