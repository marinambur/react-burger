import React from 'react';
import styles from './OrderItem.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getTotalPrice, getDate, getOrderIngredients} from "../utils";
import { useSelector} from "../../types/types";
export const OrderItem = (burger: any) => {
    const statuses: any = {
        'created': 'Создан',
        'pending': 'Готовится',
        'done': 'Выполнен'
    }
    const textColor: any = {
        done: "#00CCCC",
    };
    const allIngredients = useSelector((store: any) => (store.burgerCartReducer.allItems.items));
    const itemIngredients = getOrderIngredients(allIngredients, burger.message.ingredients);
    const price = getTotalPrice(itemIngredients);
    const status = statuses[burger.message.status];
    const date = getDate(burger.message.createdAt);
    return (
        <div className={`${styles.item} p-6`}>
            <div className={`${styles.info}`}>
                <p className="text text_type_digits-default">#{burger.message.number}</p>
                <p className="text text_type_main-default text_color_inactive mb-6">{date}</p>
            </div>
            <p className="text text_type_main-medium mb-2">{burger.message.name}</p>
            <p className="text text_type_main-default mb-6" style={{ color: textColor[burger.message.status] }}>{status}</p>
            <div className = {styles.wrapper}>
                <div className= {styles.ingredientsBox}>
                {itemIngredients?.map((item, index) => {
                    if (index<5) {
                        return (
                            <div key={index} className={styles.circle}>
                                <img className={styles.circleImg} src={item.image_mobile} alt="ingredient" />
                            </div>
                        )
                    }
                    if (index===5) {
                        return (
                            <div key={index} className={styles.circle}>
                                <img className={styles.circleImg}
                                     style={{
                                    opacity: itemIngredients.length > 6 ? "0.4" : "1",
                                }}
                                     src={item.image_mobile} alt="ingredient" />
                                {itemIngredients.length > 6 && (
                                    <span className={`${styles.invisible} text text_type_digits-default`}>+{itemIngredients.length - index - 1}</span>
                                )}
                            </div>
                        )
                    }
                    if (index > 5) return;
                })}
                </div>
                <div className={`${styles.text} mb-1`}>
                    <p className="text text_type_digits-default mr-2">{price}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

