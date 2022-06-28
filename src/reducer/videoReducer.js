import { VIDEO_ACTIONS } from '../helpers/actions';
import { structureVideoData } from '../helpers/auxiliaryFunctions';

const videoReducer = (state, { type, payload }) => {
    switch (type) {
        case VIDEO_ACTIONS.ADD:
            return [...state, structureVideoData(payload)];

        case VIDEO_ACTIONS.REMOVE:
            return state.filter((item) => item.id !== payload);

        case VIDEO_ACTIONS.SET_AS_FAVORITE: {
            const { id, ...rest } = payload;

            return state.map((item) => (item.id === id ? { ...item, ...rest } : item));
        }

        case VIDEO_ACTIONS.CLEAR:
            return [];

        case VIDEO_ACTIONS.SORT_FROM_NEWEST:
            return [...state.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))];

        case VIDEO_ACTIONS.SORT_FROM_ELDEST:
            return [...state.sort((a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded))];

        case VIDEO_ACTIONS.SET_TILES_VIEW:
            return state.map((item) => (item.view === 'list' ? { ...item, view: 'tiles' } : item));

        case VIDEO_ACTIONS.SET_LIST_VIEW:
            return state.map((item) => (item.view === 'tiles' ? { ...item, view: 'list' } : item));

        case VIDEO_ACTIONS.SET_DEMO_VIDEO_LIST:
            console.log('p', payload);
            return state;
        default:
            return state;
    }
};

export default videoReducer;
