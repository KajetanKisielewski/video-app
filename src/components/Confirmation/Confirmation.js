import React, { useContext } from 'react';

import VideoContext from '../../context/VideoContext';
import { VIDEO_ACTIONS } from '../../helpers/actions';

import './confirmation.css';

const Confirmation = (props) => {
    const { closeModal, id = null } = props;

    const videoContext = useContext(VideoContext);

    const setParagraphContent = () => (id ? 'Remove video?' : 'Clear the board?');

    const clearBoard = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.CLEAR });
        return closeModal();
    };

    const removeTask = () => {
        videoContext.dispatch({ type: VIDEO_ACTIONS.REMOVE, payload: id });
        return closeModal();
    };

    const handleRemove = () => (id ? removeTask() : clearBoard());

    return (
        <>
            <p className="modal__paragraph">{setParagraphContent()}</p>
            <div className="modal__actions">
                <button className="modal__confirm" onClick={handleRemove} type="button">
                    yes
                </button>
                <button className="modal__cancel" onClick={() => closeModal()} type="button">
                    no
                </button>
            </div>
        </>
    );
};

export default Confirmation;
