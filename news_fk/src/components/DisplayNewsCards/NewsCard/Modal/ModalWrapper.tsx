import React from 'react';
import Modal from './Modal';

interface ModalProps {
    url: string;
    description: string;
    title: string;
    img: string;
    type: number;
}

const ModalWrapper: React.FC<ModalProps> = (props) => {
    if (props.type === 1) {
        return (
            <Modal {...props} />
        );
    }
    else {
        return <div></div>
    }
}
export default ModalWrapper;