import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function ModalOverlay(props: any) {
    return (
        <div className={styles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    );
}
ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element
}
function Modal(props: any) {
    const modalRoot = document.getElementById("modals")!;
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={props.onClose}>
                    <div className={styles.popup}>
                        <div className={styles.close}><CloseIcon type="primary" onClick={props.onClose}/></div>
                        {props.children}
                    </div>
                </ModalOverlay>
            </>
        ),
        modalRoot
    );
}
Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element
}
export default Modal;