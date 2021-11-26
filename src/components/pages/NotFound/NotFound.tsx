import React from 'react';
import styles from './NotFound.module.css'
export const NotFound
= () => {
    return (
        <div className={styles.box}>
            Что-то не так с сервером, приложение не может работать без данных
        </div>
    );
};
