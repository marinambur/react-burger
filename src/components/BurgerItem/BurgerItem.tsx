import React from 'react';
import styles from "../BurgerItem/BurgerItem.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function BurgerItem(props: any) {
    return (
        <div className={styles.item}>
            <img className={`${styles.img} mb-1`} src={props.img} alt={props.name}></img>
            <div className={`${styles.text} mb-1`}>
                <p className="text text_type_digits-default mr-2">{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small">
                {props.name}
            </p>
        </div>
    );
}
BurgerItem.propTypes= {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
}
export default BurgerItem;