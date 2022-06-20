import { VIDEO_ACTIONS } from '../helpers/actions';
import { structureVideoData } from '../helpers/auxiliaryFunctions';

const videoReduer = (state, { type, payload }) => {
    switch (type) {
        case VIDEO_ACTIONS.ADD:
            return [...state, structureVideoData(payload)];
        default:
            return state;
    }
};

export default videoReduer;
