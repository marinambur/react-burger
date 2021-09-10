import React from 'react';
import styles from "../BurgerItem/BurgerItem.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerItem(props: any) {
    return (
        <div className={styles.item}>
            <img className={`${styles.img} mb-1`} src={props.img}></img>
            <div className={`${styles.text} mb-1`}>
                <p className="text text_type_digits-medium mb-1">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-medium">
                {props.name}
            </p>
        </div>
    );
}

export default BurgerItem;