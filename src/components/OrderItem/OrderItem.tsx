import React from 'react';
import styles from './OrderItem.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderItem = () => {
    return (
        <div className={`${styles.item} p-6`}>
            <div className={`${styles.info}`}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive mb-6">Сегодня, 16:20 GMT</p>
            </div>
            <p className="text text_type_main-medium mb-2">Death Star Starship Main бургер</p>
            <p className="text text_type_main-default mb-6">Создан</p>
            <div className = {styles.wrapper}>
                <div className= {styles.ingredientsBox}>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="ingredient" />
                    </div>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
                    </div>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
                    </div>
                </div>
                <div className={`${styles.text} mb-1`}>
                    <p className="text text_type_digits-default mr-2">530</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

