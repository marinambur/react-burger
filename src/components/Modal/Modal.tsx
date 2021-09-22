import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function ModalOverlay(props: any) {
    return (
        <div className={styles.overlay} id="overlay" onClick={props.onClose}>
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
    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.onClose();
        }
    };
    const onOverlayClose = (e: any) => {
        e.stopPropagation();
        const overlay = document.getElementById('overlay')
        if (e.target===overlay ) {
            props.onClose()
        }

    }
    useEffect(()=> {
        document.addEventListener('keydown', closeOnEsc);
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
        };
    })

    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={onOverlayClose}>
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
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    // onOverlayClose: PropTypes.func.isRequired,
}
export default Modal;