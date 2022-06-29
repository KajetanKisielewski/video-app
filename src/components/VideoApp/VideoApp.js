import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import VideoList from '../VideoList/VideoList';
import VideoToolbox from '../VideoToolbox/VideoToolbox';
import VideoPagination from '../VideoPagination/VideoPagination';

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

    const [currentPage, setCurrentPage] = React.useState(1);

    React.useEffect(() => {
        if (data?.length !== 0) {
            dispatch({ type: VIDEO_ACTIONS.ADD, payload: data });
        }
    }, [data]);

    React.useEffect(() => {
        setLocalStorage(videos);
    }, [videos]);

    //  PAGINATION

    const videoPerPage = 3;
    const indexOfLastVideo = currentPage * videoPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videoPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(videos.length / videoPerPage); i += 1) {
        pageNumbers.push(i);
    }

    //  PAGINATION

    const contextValues = React.useMemo(() => ({
        videos: currentVideos,
        dispatch,
        setContent,
        showModal,
        closeModal,
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
                <Row className="footer">
                    <Col>
                        <VideoPagination
                            currentPage={currentPage}
                            pageNumbers={pageNumbers}
                            setCurrentPage={setCurrentPage}
                        />
                    </Col>
                </Row>
                <RenderModalContent />
            </Container>
        </VideoContext.Provider>
    );
};

export default VideoApp;
