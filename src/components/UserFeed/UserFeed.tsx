import React from 'react';
import styles from './UserFeed.module.css';
import {OrderItem} from "../OrderItem/OrderItem";
import {useLocation, Link} from "react-router-dom";
import {useSelector} from "../../types/types";
import {LoaderComponent} from "../LoaderComponent/LoaderComponent";

export const UserFeed = () => {

    const myBurgers = useSelector((store: any) => store?.wsMyReducer?.myMessages[0]);
    const location = useLocation();
    // if (!myBurgers) {
    //     return (
    //         <>
    //             <LoaderComponent/>
    //         </>
    //     );
    // }
    return (
        <div className={`${styles.box} ${styles.customScroll}`}>
            {myBurgers &&
            myBurgers.orders?.map((myBurger: any, index: number) => (
                <Link  className={styles.link} key={myBurger.number} to={{
                    pathname: `/profile/orders/${myBurger.number}`,
                    state: { background: location }
                }}>
                    <OrderItem message={myBurger} key={index}></OrderItem>
                </Link>
                )
            )
            }

        </div>
    );
};
