import React, {useRef} from 'react';
import styles from './Modaloverlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay(props: any) {
    const modalRef = useRef(null);
    const onOverlayClose = (e: any) => {
        e.stopPropagation();
        if (e.target===modalRef.current ) {
            props.onClose()
        }
    }
    return (
        <div className={styles.overlay} id="overlay" ref={modalRef} onClick={onOverlayClose}>
            {props.children}
        </div>
    );
}
ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element
}
export default ModalOverlay;