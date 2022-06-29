/* eslint-disable no-unused-vars */
import React from 'react';
import { Button } from 'reactstrap';

import Confirmation from '../Confirmation/Confirmation';

import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/actions';
import { convertDate } from '../../helpers/auxiliaryFunctions';

import './videoItem.css';

const VideoItem = ({ videoData }) => {
    const { id, title, likeCount, viewCount, videoThumb, dateAdded, player, view } = videoData;

    const videoContext = React.useContext(VideoContext);

    const removeVideo = () => {
        videoContext.setContent(<Confirmation closeModal={videoContext.closeModal} id={id} />);
        videoContext.showModal();
    };

    const setAsFavorite = () => {
        videoContext.dispatch({
            type: VIDEO_ACTIONS.SET_AS_FAVORITE,
            payload: { id, isFavorite: true },
        });
    };

    const watchVideo = () => {
        videoContext.setContent(player);
        videoContext.showModal();
    };

    const renderVideoItem = () => (
        <div className={`main__video--${view} shadow p-3 mb-5 bg-white rounded`}>
            <h3 className={`video__title--${view}`}>{title}</h3>
            <ul className={`video__list--${view}`}>
                <li className={`list__item list__item--${view}`}>
                    <img className={`item__img--${view}`} src={videoThumb} alt="video thumbnail" />
                </li>
                <li className="list__item">likeCount: {likeCount}</li>
                <li className="list__item">vievCount: {viewCount}</li>
                <li className="list__item">Added at: {convertDate(dateAdded)}</li>
            </ul>
            <Button className={`video__button--${view}`} onClick={watchVideo}>
                Watch it
            </Button>
            <Button className={`video__button--${view}`} onClick={removeVideo}>
                Delete
            </Button>
            <Button className={`video__button--${view}`} onClick={setAsFavorite}>
                Add to favorites
            </Button>
        </div>
    );

    return <>{renderVideoItem()}</>;
};

export default VideoItem;
