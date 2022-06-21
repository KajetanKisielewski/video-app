import React from 'react';
import { Button } from 'reactstrap';

import { EditContext } from '../context';
import { VIDEO_ACTIONS } from '../helpers/actions';

import '../styles/videoItem.css';

const VideoItem = ({ videoData }) => {
    const { id, videoID, title, likeCount, viewCount, videoThumb, dateAdded } = videoData;
    const editVideo = React.useContext(EditContext);

    const removeVideo = () => {
        editVideo({ type: VIDEO_ACTIONS.REMOVE, payload: id });
    };

    const setAsFavorite = () => {
        editVideo({ type: VIDEO_ACTIONS.SET_AS_FAVORITE, payload: { id, isFavorite: true } });
    };

    const renderVideoItem = () => (
        <div className="main__video shadow p-3 mb-5 bg-white rounded">
            <h3 className="video__title">{title}</h3>
            <ul className="video__list">
                <li className="list__item item__img">
                    <picture>
                        <source media="(min-width: 1200px)" srcSet={videoThumb.hight.url} />
                        <source media="(min-width: 768px)" srcSet={videoThumb.medium.url} />
                        <img src={videoThumb.default.url} alt="video thumbnail" />
                    </picture>
                </li>
                <li className="list__item">videoID : {videoID}</li>
                <li className="list__item">likeCount: {likeCount}</li>
                <li className="list__item">vievCount: {viewCount}</li>
                <li className="list__item">You added this video on: {dateAdded}</li>
            </ul>
            <Button className="video__button">Watch it</Button>
            <Button className="video__button" onClick={removeVideo}>
                Delete
            </Button>
            <Button className="video__button" onClick={setAsFavorite}>
                Add to favorites
            </Button>
        </div>
    );

    return <>{renderVideoItem()}</>;
};

export default VideoItem;
