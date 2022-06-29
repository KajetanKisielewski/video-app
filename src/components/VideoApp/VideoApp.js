/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import VideoList from '../VideoList/VideoList';
import VideoToolbox from '../VideoToolbox/VideoToolbox';

import { useFetch, useLocalStorage, useModal, useFetchParametersGenerate } from '../../hooks';
import { VIDEO_ACTIONS } from '../../helpers/actions';
import { videoReducer } from '../../reducer';
import VideoContext from '../../context/VideoContext';

import './videoApp.css';

const VideoApp = () => {
    const [showModal, closeModal, RenderModalContent, setContent] = useModal();
    const [getLocalStorage, setLocalStorage] = useLocalStorage();
    const [setUrl, generatedParameters] = useFetchParametersGenerate();
    const { data, loading, error } = useFetch(generatedParameters);
    const [videos, dispatch] = React.useReducer(videoReducer, getLocalStorage() || []);
    const [favorite, setFavorite] = React.useState(false);

    console.log('videos', videos);

    React.useEffect(() => {
        if (data?.length !== 0) {
            dispatch({ type: VIDEO_ACTIONS.ADD, payload: data });
        }
    }, [data]);

    React.useEffect(() => {
        setLocalStorage(videos);
    }, [videos]);

    const contextValues = React.useMemo(() => ({
        videos,
        dispatch,
        setContent,
        showModal,
        setUrl,
        favorite,
        setFavorite,
    }));

    return (
        <VideoContext.Provider value={contextValues}>
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
                        {loading && <h3 className="main__heading--loading">Loading...</h3>}
                        {error && <h3 className="main__heading--error">Error</h3>}
                        <VideoList />
                    </Col>
                </Row>
                <RenderModalContent />
            </Container>
        </VideoContext.Provider>
    );
};

export default VideoApp;
