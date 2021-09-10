import React from 'react';
import styles from './BurgerIngredient.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerIngredient(props: any) {
    return (
        <div className={styles.item}>
            <img className={`${styles.img} mb-1`} src={props.img}></img>
            <p className="text text_type_main-medium">
                {props.name}
            </p>
            <div className={`${styles.text} mb-1`}>
                <p className="text text_type_digits-medium mb-1">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
        </div>
    );
}

export default BurgerIngredient;