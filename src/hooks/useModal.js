import React from 'react';
import Modal from '../components/Modal';

const useModal = () => {
    const [visible, setVisible] = React.useState(false);
    const [content, setContent] = React.useState(null);

    const showModal = () => setVisible(true);

    const closeModal = () => setVisible(false);

    const renderModalContent = () =>
        visible ? <Modal content={content} closeModal={closeModal} /> : null;

    return [showModal, closeModal, renderModalContent, setContent];
};

export default useModal;
