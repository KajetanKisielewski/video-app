import React from 'react';
import useFetch from '../hooks/useFetch';

import { VIDEO_ACTIONS } from '../helpers/actions';

const SearchResult = ({ url, dispatch, videos }) => {
    const [fetchedData, loading, error, fetchData] = useFetch(url);

    React.useEffect(() => {
        if (url !== null) fetchData(url);
    }, [url]);

    React.useEffect(() => {
        if (fetchedData !== null) {
            dispatch({
                type: VIDEO_ACTIONS.ADD,
                payload: fetchedData,
            });
        }
    }, [fetchedData]);

    const renderSearchVideo = () =>
        videos.map((video) => {
            const { id, videoID, title, likeCount, viewCount, videoThumb } = video;

            return (
                <div key={id}>
                    <h3>{title}</h3>
                    <ul>
                        <li>videoID : {videoID}</li>
                        <li>likeCount: {likeCount}</li>
                        <li>vievCount: {viewCount}</li>
                        <li>
                            <img src={videoThumb.videoThumbDefault.url} alt="thumb" />
                        </li>
                    </ul>
                </div>
            );
        });

    return (
        <>
            <h2>Videos List</h2>
            {loading && <h3>Loading...</h3>}
            {error && <h3>Error</h3>}
            {renderSearchVideo()}
        </>
    );
};

export default SearchResult;
