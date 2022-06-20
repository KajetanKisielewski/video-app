import { v4 as uuid } from 'uuid';

const getYoutubeVideoID = (url) => {
    const regex =
        /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return url.replace(regex, `$1`);
};

export const generateURL = (query) => {
    const KEY = 'AIzaSyCXQ0QWGGkVpBg_heSIdIWVMXtf2hu1k_k';
    const baseURL = `https://www.googleapis.com/youtube/v3/videos`;
    const youtubeVideoID = getYoutubeVideoID(query);

    const url = `${baseURL}?id=${youtubeVideoID}&key=${KEY}&part=snippet,statistics&fields=items(id,snippet(title,thumbnails),statistics(viewCount,likeCount))`;

    return url;
};

export const structureVideoData = (videoData) => {
    console.log('structure', videoData);
    const {
        id,
        snippet: { title, thumbnails },
        statistics: { viewCount, likeCount },
    } = videoData.items[0];

    return {
        id: uuid(),
        videoID: id,
        title,
        videoThumb: {
            videoThumbDefault: thumbnails.default,
            videoThumbMedium: thumbnails.medium,
            videoThumbHight: thumbnails.high,
        },
        viewCount,
        likeCount,
    };
};

export const clearInputValue = (className) => {
    const input = document.querySelector(className);
    input.value = '';
};
