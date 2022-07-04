import React from 'react';
import { Button } from 'reactstrap';

import Confirmation from '../Confirmation/Confirmation';

import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/reducersActions';
import {
    convertDate,
    setIframeStructure,
    setClassNameModifier,
} from '../../helpers/auxiliaryFunctions';

import './videoItem.css';

const VideoItem = ({ videoData }) => {
    const { id, title, likeCount, viewCount, videoThumb, dateAdded, player } = videoData;

    const { setContent, showModal, dispatch, listView, showFavorite } =
        React.useContext(VideoContext);

    const removeVideo = () => {
        setContent(<Confirmation id={id} />);
        showModal();
    };

    const toggleFavoriteState = (value) => {
        dispatch({
            type: VIDEO_ACTIONS.TOGGLE_FAVORITE,
            payload: { id, isFavorite: value },
        });
    };

    const watchVideo = () => {
        const iframe = setIframeStructure(player);
        setContent(iframe);
        showModal();
    };

    const renderVideoItem = () => (
        <div
            className={`main__video--${setClassNameModifier(listView)}
            shadow p-3 mb-5 bg-white rounded`}
        >
            <h3 className={`video__title--${setClassNameModifier(listView)}`}>{title}</h3>
            <ul className={`video__list--${setClassNameModifier(listView)}`}>
                <li className={`list__item list__item--${setClassNameModifier(listView)}`}>
                    <img
                        className={`item__img--${setClassNameModifier(listView)}`}
                        src={videoThumb}
                        alt="video thumbnail"
                        onClick={watchVideo}
                        role="presentation"
                    />
                </li>
                <li className="list__item">Likes: {likeCount}</li>
                <li className="list__item">Vievs: {viewCount}</li>
                <li className="list__item">Added at: {convertDate(dateAdded)}</li>
            </ul>
            <Button
                className={`video__button--${setClassNameModifier(listView)}`}
                onClick={watchVideo}
            >
                Watch it
            </Button>
            <Button
                className={`video__button--${setClassNameModifier(listView)}`}
                onClick={removeVideo}
            >
                Delete
            </Button>
            <Button
                className={`video__button--${setClassNameModifier(listView)}`}
                onClick={() => toggleFavoriteState(!showFavorite)}
            >
                {showFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </Button>
        </div>
    );

    return <>{renderVideoItem()}</>;
};

export default VideoItem;
