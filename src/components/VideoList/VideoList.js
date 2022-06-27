import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import VideoContext from '../../context/VideoContext';

const VideoList = () => {
    const videoContext = React.useContext(VideoContext);

    const renderVideoItems = () =>
        videoContext.videos.map((video) => <VideoItem key={video.id} videoData={video} />);

    return <>{renderVideoItems()}</>;
};

export default VideoList;
