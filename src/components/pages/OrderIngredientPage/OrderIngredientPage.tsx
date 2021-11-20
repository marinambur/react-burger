import React, {useEffect} from 'react';
import styles from "./OrderIngredientPage.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useParams, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {wsActions, wsMyActions} from "../../../index";
import {getFeed} from "../../../services/actions";
import {getTotalPrice, getDate, getOrderIngredients} from "../../utils";

export const OrderIngredientPage = () => {

    const isFeed = !!useRouteMatch("/feed");

    // @ts-ignore
    let ID = useParams().id;
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getFeed())
    }, []);
    const allIngredients = useSelector((store: any) => (store.burgerCartReducer.allItems.items));

    useEffect(() => {
        dispatch({ type: wsActions.wsInit });
        return () => {
            dispatch({ type: wsActions.onClose });
        };
    }, []);
    useEffect(() => {
        dispatch({ type: wsMyActions.wsInit });
        return () => {
            dispatch({ type: wsMyActions.onClose });
        };
    }, []);

         const allOrderItems = useSelector((store: any) => (store?.wsReducer?.messages[0]?.orders));
    const myItems = useSelector((store: any) => (store?.wsReducer?.messages[1]?.orders));



    const myOrder = isFeed ?  allOrderItems?.filter((item: any)=>item.number===Number(ID))[0] : myItems?.filter((item: any)=>item.number===Number(ID))[0];
    const itemIngredients = getOrderIngredients(allIngredients, myOrder?.ingredients);
    console.log(itemIngredients, 'itemIngredients')
    console.log((store: any) => (store?.wsMyReducer), 'myItems')

    const price = getTotalPrice(itemIngredients);
    const date = getDate(myOrder?.createdAt);
    return (
        <>
            {myOrder && <div className={styles.box}>
                <p className={`${styles.cardNumber} text text_type_digits-default mb-8`}>#{myOrder.number}</p>
                <p className={`${styles.header} text text_type_main-medium mb-8`}>{myOrder.name}</p>
                <p className={`${styles.cardText} ${styles.cardReadyText} text text_type_main-default mb-8`}>Выполнен</p>
                <p className={`${styles.cardText} text text_type_main-medium mb-8`}>Состав:</p>

                <div className={styles.container}>
                    {itemIngredients?.map((item, index)=> (
                        <div className={styles.element} key={index}><div className={styles.elementContainer}>
                            <div className={styles.circle}>
                                <img className={styles.circleImg} src={item.image_mobile} alt="" />
                            </div>
                            <p className="text text_type_main-default mb-2">{item.name}</p>
                        </div>
                        <div className={styles.elementContainer}>
                        <div className={`${styles.element} mb-1`}>
                        <p className="text text_type_digits-default mr-2">{item.price}</p>
                        <CurrencyIcon type="primary" />
                        </div>
                        </div></div>
                    ))}
                </div>
                <div className={`${styles.element}`}>
                    <p className="text text_type_main-default text_color_inactive mb-6">{date}</p>
                    <div className={`${styles.elementContainer}`}>
                        <p className="text text_type_digits-default mr-2">{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>


            </div>}
        </>)

};
