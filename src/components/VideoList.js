import React from 'react';
import VideoItem from './VideoItem';
import { VideoContext } from '../context';

const VideoList = () => {
    const videos = React.useContext(VideoContext);

    const renderVideoItems = () =>
        videos.map((video) => <VideoItem key={video.id} videoData={video} />);

    return <>{renderVideoItems()}</>;
};

export default VideoList;
