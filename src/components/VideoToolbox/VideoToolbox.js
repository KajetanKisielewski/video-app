import React from 'react';
import { Button } from 'reactstrap';
import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/actions';
import { createDemosList } from '../../helpers/auxiliaryFunctions';

import './videoToolbox.css';

const VideoToolbox = () => {
    const videoContext = React.useContext(VideoContext);

    const clearVideoList = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.CLEAR });
    };

    const sortFromNewest = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.SORT_FROM_NEWEST });
    };

    const sortFromEldest = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.SORT_FROM_ELDEST });
    };

    const setTilesView = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.SET_TILES_VIEW });
    };

    const setListView = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.SET_LIST_VIEW });
    };

    const setDemoVideoList = () => {
        const demos = createDemosList();
        videoContext.setUrl(demos);
    };

    return (
        <div className="toolbox__actions shadow p-3 mb-5 bg-white rounded">
            <Button className="actions actions__clear" onClick={clearVideoList}>
                Wyczyść listę
            </Button>
            <Button className="actions actions__upload" onClick={setDemoVideoList}>
                Wgraj demo
            </Button>
            <Button className="actions actions__newest" onClick={sortFromNewest}>
                Sortuj od najnowszych
            </Button>
            <Button className="actions actions__eldest" onClick={sortFromEldest}>
                Sortuj od najstarszych
            </Button>
            <Button className="actions actions__list" onClick={setListView}>
                Widok lista
            </Button>
            <Button className="actions actions__tiled" onClick={setTilesView}>
                Widok kafelki
            </Button>
        </div>
    );
};

export default VideoToolbox;
