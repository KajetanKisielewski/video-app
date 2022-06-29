import React from 'react';

import VideoItem from '../VideoItem/VideoItem';
import VideoContext from '../../context/VideoContext';

const VideoList = () => {
    const videoContext = React.useContext(VideoContext);

    const renderAllVideoItems = () =>
        videoContext.videos?.map((video) => <VideoItem key={video.id} videoData={video} />);

    const renderFavVideoItem = () =>
        videoContext.videos?.map((video) =>
            video.isFavorite ? <VideoItem key={video.id} videoData={video} /> : null,
        );

    const renderVideoItems = () =>
        videoContext.favorite ? renderFavVideoItem() : renderAllVideoItems();

    return <>{renderVideoItems()}</>;
};

export default VideoList;