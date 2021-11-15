import React from 'react';
import styles from "./OrderIngredientPage.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderIngredientPage = () => {
    return (
        <div className={styles.box}>
            <p className={`${styles.cardNumber} text text_type_digits-default mb-8`}>#034533</p>
            <p className={`${styles.header} text text_type_main-medium mb-8`}>Black Hole Singularity острый бургер</p>
            <p className={`${styles.cardText} ${styles.cardReadyText} text text_type_main-default mb-8`}>Выполнен</p>
            <p className={`${styles.cardText} text text_type_main-medium mb-8`}>Состав:</p>
            <div className={styles.element}>
                <div className={styles.elementContainer}>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
                    </div>
                    <p className="text text_type_main-default mb-2">Флюоресцентная булка R2-D3</p>
                </div>
             <div className={styles.elementContainer}>
                 <div className={`${styles.element} mb-1`}>
                     <p className="text text_type_digits-default mr-2">2 X 530</p>
                     <CurrencyIcon type="primary" />
                 </div>
             </div>
            </div>

            <div className={styles.element}>
                <div className={styles.elementContainer}>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
                    </div>
                    <p className="text text_type_main-default mb-2">Флюоресцентная булка R2-D3</p>
                </div>
                <div className={styles.elementContainer}>
                    <div className={`${styles.element}`}>
                        <p className="text text_type_digits-default mr-2">2 X 530</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>

            <div className={styles.element}>
                <div className={styles.elementContainer}>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
                    </div>
                    <p className="text text_type_main-default mb-2">Флюоресцентная булка R2-D3</p>
                </div>
                <div className={styles.elementContainer}>
                    <div className={`${styles.element}`}>
                        <p className="text text_type_digits-default mr-2">2 X 530</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>

            <div className={styles.element}>
                <div className={styles.elementContainer}>
                    <div className={styles.circle}>
                        <img className={styles.circleImg} src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
                    </div>
                    <p className="text text_type_main-default mb-2">Флюоресцентная булка R2-D3</p>
                </div>
                <div className={styles.elementContainer}>
                    <div className={`${styles.element}`}>
                        <p className="text text_type_digits-default mr-2">2 X 530</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={`${styles.element}`}>
            <p className="text text_type_main-default text_color_inactive mb-6">Сегодня, 16:20 GMT</p>
            <div className={`${styles.elementContainer}`}>
                <p className="text text_type_digits-default mr-2">530</p>
                <CurrencyIcon type="primary" />
            </div>
            </div>


        </div>
    );
};
