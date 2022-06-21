/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from './NavBar';
import SearchBar from './SearchBar';
import VideoList from './VideoList';

import { useFetch, useLocalStorage, useModal } from '../hooks';

import { VideoContext, EditContext } from '../context';

import { videoReducer } from '../reducer';
import { VIDEO_ACTIONS } from '../helpers/actions';

import '../styles/videoApp.css';

const VideoApp = () => {
    const [url, setUrl] = React.useState(null);
    const [showModal, closeModal, RenderModalContent, setContent] = useModal();
    const [getLocalStorage, setLocalStorage] = useLocalStorage();
    const { data, loading, error } = useFetch(url);
    const [videos, dispatch] = React.useReducer(videoReducer, getLocalStorage() || []);

    React.useEffect(() => {
        if (data.length !== 0) {
            dispatch({
                type: VIDEO_ACTIONS.ADD,
                payload: data,
            });
        }
    }, [data]);

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
            <VideoContext.Provider value={videos}>
                <EditContext.Provider value={dispatch}>
                    <Row className="main">
                        <Col className="main__col">
                            <h2 className="main__heading">Videos List</h2>
                            {loading && <h3>Loading...</h3>}
                            {error && <h3>Error</h3>}
                            <VideoList />
                        </Col>
                    </Row>
                    <RenderModalContent />
                </EditContext.Provider>
            </VideoContext.Provider>
        </Container>
    );
};

export default VideoApp;
