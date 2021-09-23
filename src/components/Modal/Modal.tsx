import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../ModalOverlay/ModalOverlay";


function Modal(props: any) {
    const modalRoot = document.getElementById("modals")!;
    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            props.onClose();
        }
    };
    useEffect(()=> {
        document.addEventListener('keydown', closeOnEsc);
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
        };
    })

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
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
}
export default Modal;