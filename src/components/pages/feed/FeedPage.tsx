import React from 'react';
import styles from './feed.module.css';
import {OrderFeed} from "../../OrderFeed/OrderFeed";
export const FeedPage = () => {
    return (
            <div className={styles.content}>
                <div className={styles.ingredients}>
                    <h1>Лента заказов</h1>
                    <OrderFeed></OrderFeed>
                </div>
                <div className={styles.info}>
                    <div className={`${styles.line} mb-15`}>
                        <div className={`${styles.ready} mr-9`}>
                            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                            <p className={`${styles.textReady} text text_type_digits-default mb-2`}>123456</p>
                            <p className={`${styles.textReady} text text_type_digits-default mb-2`}>123456</p>
                            <p className={`${styles.textReady} text text_type_digits-default mb-2`}>123456</p>
                            <p className={`${styles.textReady} text text_type_digits-default mb-2`}>123456</p>
                            <p className={`${styles.textReady} text text_type_digits-default mb-2`}>123456</p>
                            <p className={`${styles.textReady} text text_type_digits-default mb-2`}>123456</p>
                        </div>
                        <div className={styles.working}>
                            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                            <p className="text text_type_digits-default mb-2">123456</p>
                            <p className="text text_type_digits-default mb-2">123456</p>
                            <p className="text text_type_digits-default mb-2">123456</p>
                        </div>
                    </div>
                    <div className={styles.allTime}>
                        <h2 className="text text_type_main-medium mb-2">Выполнено за все время:</h2>
                        <p className={`${styles.glow} text text_type_digits-large mb-8`}>28752</p>
                    </div>
                    <div className={styles.today}>
                        <h2 className="text text_type_main-medium mb-2">Выполнено за сегодня:</h2>
                        <p className={`${styles.glow} text text_type_digits-large mb-8`}>138</p>
                    </div>
                </div>

            </div>
    );
};

