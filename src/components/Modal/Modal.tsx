import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function ModalOverlay(props: any) {
    return (
        <div className={styles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    );
}
function Modal(props: any) {
    const modalRoot = document.getElementById("modals")!;
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={props.onClose}>
                    <CloseIcon type="primary" onClick={props.onClose}/>
                    <div className={styles.popup}>
                        {props.children}
                    </div>
                </ModalOverlay>
            </>
        ),
        modalRoot
    );
}

export default Modal;