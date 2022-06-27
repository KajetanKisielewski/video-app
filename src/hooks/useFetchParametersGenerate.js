/* eslint-disable consistent-return */
import React from 'react';

import { YOUTUBE_API_KEY, VIMEO_API_KEY } from '../../apiKeys';

const useFetchParametersGenerate = () => {
    const [url, setUrl] = React.useState(null);

    const getYoutubeVideoID = () => {
        const regex =
            /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;

        return url.replace(regex, `$1`);
    };

    const getVimeoVideoID = () => {
        const regex =
            /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i;

        return url.match(regex)[1];
    };

    const generateFetchParametersForYoutube = () => {
        const KEY = YOUTUBE_API_KEY;
        const baseURL = `https://www.googleapis.com/youtube/v3/videos`;
        const youtubeVideoID = getYoutubeVideoID();

        const path = `${baseURL}?id=${youtubeVideoID}&key=${KEY}&part=snippet,statistics,player&fields=items(snippet(title,thumbnails),statistics(viewCount,likeCount),player(embedHtml))`;

        return [path];
    };

    const generateFetchParametersForVimeo = () => {
        const key = VIMEO_API_KEY;
        const baseURL = 'https://api.vimeo.com/videos/';
        const vimeoVideoID = getVimeoVideoID();

        const path = `${baseURL}${vimeoVideoID}?fields=name,pictures.base_link,metadata.connections.likes.total,stats.plays,embed.html`;

        const options = {
            method: 'GET',
            headers: {
                Authorization: `bearer ${key}`,
            },
        };

        return [path, options];
    };

    const generateFetchParameters = () => {
        const youtubeIDLength = 11;

        if (!url) return;

        return url.length === youtubeIDLength || url.includes('you')
            ? generateFetchParametersForYoutube()
            : generateFetchParametersForVimeo();
    };

    return [setUrl, generateFetchParameters];
};

export default useFetchParametersGenerate;
