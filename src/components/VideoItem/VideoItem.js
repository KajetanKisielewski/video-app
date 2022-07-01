import React from 'react';
import { Button } from 'reactstrap';

import Confirmation from '../Confirmation/Confirmation';

import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/reducersActions';
import { convertDate, setIframeStructure } from '../../helpers/auxiliaryFunctions';

import './videoItem.css';

const VideoItem = ({ videoData }) => {
    const { id, title, likeCount, viewCount, videoThumb, dateAdded, player } = videoData;

    const { setContent, showModal, dispatch, listView, favorite } = React.useContext(VideoContext);

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

    const setClassNameModifier = () => (listView ? 'list' : 'tiles');

    const renderVideoItem = () => (
        <div className={`main__video--${setClassNameModifier()} shadow p-3 mb-5 bg-white rounded`}>
            <h3 className={`video__title--${setClassNameModifier()}`}>{title}</h3>
            <ul className={`video__list--${setClassNameModifier()}`}>
                <li className={`list__item list__item--${setClassNameModifier()}`}>
                    <img
                        className={`item__img--${setClassNameModifier()}`}
                        src={videoThumb}
                        alt="video thumbnail"
                    />
                </li>
                <li className="list__item">Likes: {likeCount}</li>
                <li className="list__item">Vievs: {viewCount}</li>
                <li className="list__item">Added at: {convertDate(dateAdded)}</li>
            </ul>
            <Button className={`video__button--${setClassNameModifier()}`} onClick={watchVideo}>
                Watch it
            </Button>
            <Button className={`video__button--${setClassNameModifier()}`} onClick={removeVideo}>
                Delete
            </Button>
            <Button
                className={`video__button--${setClassNameModifier()}`}
                onClick={() => toggleFavoriteState(!favorite)}
            >
                {favorite ? 'Remove from favorites' : 'Add to favorites'}
            </Button>
        </div>
    );

    return <>{renderVideoItem()}</>;
};

export default VideoItem;
