import React, {FC, useRef} from 'react';
import styles from './Modaloverlay.module.css';
interface ModalOverlayPropsInterface {
    onClose: ()=>void,
}
const ModalOverlay: FC<ModalOverlayPropsInterface> = (props) => {
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
export default ModalOverlay;