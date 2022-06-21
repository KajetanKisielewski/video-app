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
        default:
            return state;
    }
};

export default videoReducer;
