import React, {useEffect} from 'react';
import styles from './feed.module.css';
import {OrderFeed} from "../../OrderFeed/OrderFeed";
import {wsActions} from "../../../services/actions/wsActions";
import {useDispatch, useSelector} from "../../../types/types";
import AppHeader from "../../AppHeader/AppHeader";
import {LoaderComponent} from "../../LoaderComponent/LoaderComponent";

export const FeedPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: wsActions.wsInit });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, [dispatch]);
    const orders = useSelector((store: any) => store.wsReducer.messages[0]?.orders);
    const ordersInfo = useSelector((store: any) => store.wsReducer.messages[0]);
    const doneOrders = orders?.filter((order: any)=> order.status === 'done');
    const pendingOrders = orders?.filter((order: any)=> order.status === 'pending');

    if (!orders) {
        return (
            <>
                <LoaderComponent/>
            </>
        );
    }
    return (
            <div className={styles.content}>
                <div className={styles.ingredients}>
                    <h1 className='text text_type_main-large mb-6'>Лента заказов</h1>
                    <OrderFeed></OrderFeed>
                </div>
                <div className={styles.info}>
                    <div className={`${styles.line} mb-15`}>
                        <div className={`${styles.ready} mr-9`}>
                            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                            {doneOrders?.length < 10 ? doneOrders.map((order: any, index: number)=><p key={index} className={`${styles.textReady} text text_type_digits-default mb-2`}>{order.number}</p>) :
                                <div className={styles.columns}>
                                    <div className='mr-5'>
                                        {doneOrders?.slice(0, 10).map((order: any, index: number)=><p key={index} className={`${styles.textReady} text text_type_digits-default mb-2`}>{order.number}</p>)}
                                    </div>
                                    <div>
                                        {doneOrders?.slice(10, 20).map((order: any, index: number)=><p key={index} className={`${styles.textReady} text text_type_digits-default mb-2`}>{order.number}</p>)}
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.working}>
                            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                            {pendingOrders?.length < 10 ? pendingOrders.map((order: any, index: number)=><p key={index} className={`${styles.textReady} text text_type_digits-default mb-2`}>{order.number}</p>) :
                                <div className={styles.columns}>
                                    <div className='mr-5'>
                                        {pendingOrders?.slice(0, 10).map((order: any, index: number)=><p key={index} className={`${styles.textReady} text text_type_digits-default mb-2`}>{order.number}</p>)}
                                    </div>
                                    <div>
                                        {pendingOrders?.slice(10, 20).map((order: any, index: number)=><p key={index} className={`${styles.textReady} text text_type_digits-default mb-2`}>{order.number}</p>)}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.allTime}>
                        <h2 className="text text_type_main-medium mb-2">Выполнено за все время:</h2>
                        <p className={`${styles.glow} text text_type_digits-large mb-8`}>{ordersInfo?.total}</p>
                    </div>
                    <div className={styles.today}>
                        <h2 className="text text_type_main-medium mb-2">Выполнено за сегодня:</h2>
                        <p className={`${styles.glow} text text_type_digits-large mb-8`}>{ordersInfo?.totalToday}</p>
                    </div>
                </div>

            </div>
    );
};

