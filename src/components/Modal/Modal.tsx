import React, {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
interface ModalPropsInterface {
    onClose: ()=>void,
}

const Modal: FC<ModalPropsInterface> = (props) => {
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
                    <div className={styles.popup} id='popup'>
                        <div className={styles.close}><CloseIcon type="primary" onClick={props.onClose}/></div>
                        {props.children}
                    </div>
                </ModalOverlay>
            </>
        ),
        modalRoot
    );
}
export default Modal;