/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { v4 as uuid } from 'uuid';
import { YOUTUBE_API_KEY, VIMEO_API_KEY } from '../../apiKeys';

const structureYoutubeData = (videoData) => {
    const {
        snippet: { title, thumbnails },
        statistics: { viewCount, likeCount },
        player: { embedHtml },
    } = videoData.items[0];

    return {
        id: uuid(),
        title,
        videoThumb: thumbnails.medium.url,
        viewCount,
        likeCount,
        dateAdded: new Date(),
        isFavorite: false,
        player: embedHtml,
        view: 'tiles',
    };
};
const structureVimeoData = (videoData) => {
    const {
        name,
        embed: { html },
        metadata: {
            connections: {
                likes: { total },
            },
        },
        pictures: { base_link },
        stats: { plays },
    } = videoData[0];

    return {
        id: uuid(),
        title: name,
        videoThumb: base_link,
        viewCount: plays,
        likeCount: total,
        dateAdded: new Date(),
        isFavorite: false,
        player: html,
        view: 'tiles',
    };
};

export const structureVideoData = (videoData) =>
    videoData?.items ? structureYoutubeData(videoData) : structureVimeoData([videoData]);

// id: uuid(),
// title: videoData?.items[0].snippet.title || videoData.name,
// videoThumb: videoData.items[0].snippet.thumbnails.default || videoData.pictures.base_link,
// viewCount: videoData.items[0].statistics.viewCount || videoData.stats.plays,
// likeCount: videoData.items[0].statistics.likeCount || videoData.metadata.connections.likes,
// dateAdded: new Date().toISOString().slice(0, 10),
// isFavorite: false,
// player: videoData.items[0].player.embedHtml || videoData.embed,

export const createInitState = () => ({
    data: [],
    loading: false,
    error: null,
});

export const createDemosList = () => [
    'https://www.youtube.com/watch?v=J2ESK7wvS8U&ab_channel=SBMLabel',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
    'https://www.youtube.com/watch?v=uXapuO0tgmc&ab_channel=DanMusic',
    'https://www.youtube.com/watch?v=RH-9z3XsMlI&ab_channel=MeskieGranie',
];

export const clearInputValue = (className) => {
    const input = document.querySelector(className);
    input.value = '';
};

export const convertDate = (date) => new Date(date).toISOString().slice(0, 10);

const getYoutubeVideoID = (url) => {
    const regex =
        /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;

    return url.replace(regex, `$1`);
};

const getVimeoVideoID = (url) => {
    const regex =
        /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_-]+)?/i;

    return url.match(regex)[1];
};

const generateFetchParametersForYoutube = (url) => {
    const KEY = YOUTUBE_API_KEY;
    const baseURL = `https://www.googleapis.com/youtube/v3/videos`;
    const youtubeVideoID = getYoutubeVideoID(url);

    const path = `${baseURL}?id=${youtubeVideoID}&key=${KEY}&part=snippet,statistics,player&fields=items(snippet(title,thumbnails),statistics(viewCount,likeCount),player(embedHtml))`;

    return [path];
};

const generateFetchParametersForVimeo = (url) => {
    const key = VIMEO_API_KEY;
    const baseURL = 'https://api.vimeo.com/videos/';
    const vimeoVideoID = getVimeoVideoID(url);

    const path = `${baseURL}${vimeoVideoID}?fields=name,pictures.base_link,metadata.connections.likes.total,stats.plays,embed.html`;

    const options = {
        method: 'GET',
        headers: {
            Authorization: `bearer ${key}`,
        },
    };

    return [path, options];
};

export const generateFetchParameters = (url) => {
    const youtubeIDLength = 11;
    const includedWord = 'you';

    if (!url) return {};

    return url.length === youtubeIDLength || url.includes(includedWord)
        ? generateFetchParametersForYoutube(url)
        : generateFetchParametersForVimeo(url);
};
