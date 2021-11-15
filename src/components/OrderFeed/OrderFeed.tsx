import React from 'react';
import styles from './OrderFeed.module.css';
import {OrderItem} from "../OrderItem/OrderItem";

export const OrderFeed = () => {
    return (
        <div className={`${styles.box} ${styles.customScroll}`}>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
        </div>
    );
};
