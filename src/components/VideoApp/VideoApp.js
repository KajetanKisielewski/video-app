/* eslint-disable indent */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import VideoList from '../VideoList/VideoList';
import VideoToolbox from '../VideoToolbox/VideoToolbox';

import { useFetch, useLocalStorage, useModal, useFetchParametersGenerate } from '../../hooks';
import VideoContext from '../../context/VideoContext';
import { videoReducer } from '../../reducer';
import { VIDEO_ACTIONS } from '../../helpers/actions';

import './videoApp.css';

const VideoApp = () => {
    const [showModal, closeModal, RenderModalContent, setContent] = useModal();
    const [getLocalStorage, setLocalStorage] = useLocalStorage();
    const [setUrl, generateFetchParameters] = useFetchParametersGenerate();
    const { data, loading, error } = useFetch(generateFetchParameters);
    const [videos, dispatch] = React.useReducer(videoReducer, getLocalStorage() || []);

    // console.log('vg', generateFetchParameters);
    console.log(videos);

    React.useEffect(() => {
        if (data?.length !== 0) {
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
        <VideoContext.Provider value={{ videos, dispatch, setContent, showModal, setUrl }}>
            <Container fluid className="wrap">
                <Row className="header">
                    <Col className="header__col">
                        <NavBar />
                        <SearchBar />
                        <VideoToolbox />
                    </Col>
                </Row>
                <Row className="main">
                    <Col className="main__col">
                        <h2 className="main__heading">Videos List</h2>
                        {loading && <h3>Loading...</h3>}
                        {error && <h3>Error</h3>}
                        <VideoList />
                    </Col>
                </Row>
                <RenderModalContent />
            </Container>
        </VideoContext.Provider>
    );
};

export default VideoApp;
