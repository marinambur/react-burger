import React, {useEffect} from 'react';
import styles from './OrderFeed.module.css';
import {OrderItem} from "../OrderItem/OrderItem";
import {useDispatch, useSelector} from "react-redux";
import {wsActions} from "../../index";
import {useLocation, Link} from "react-router-dom";

export const OrderFeed = () => {

    const burgers = useSelector((store: any) => store.wsReducer.messages[0]);
    const location = useLocation();
    return (
        <div className={`${styles.box} ${styles.customScroll}`}>
            {burgers?.orders &&
            burgers?.orders.map((burger: any, index: number) => (
                <Link  className={styles.link} key={burger.number} to={{
                    pathname: `/feed/${burger.number}`,
                    state: { background: location }
                }}>
                <OrderItem message={burger} key={index}></OrderItem>
                </Link>

            ))
            }

        </div>
    );
};
