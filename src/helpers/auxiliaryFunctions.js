/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { v4 as uuid } from 'uuid';

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

export const createDemosList = () => {
    const demos = [
        'https://www.youtube.com/watch?v=J2ESK7wvS8U&ab_channel=SBMLabel',
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        'https://www.youtube.com/watch?v=uXapuO0tgmc&ab_channel=DanMusic',
        'https://www.youtube.com/watch?v=RH-9z3XsMlI&ab_channel=MeskieGranie',
    ];

    return demos;
};

export const clearInputValue = (className) => {
    const input = document.querySelector(className);
    input.value = '';
};

export const convertDate = (date) => new Date(date).toISOString().slice(0, 10);
