import React from 'react';
import styles from "../BurgerItem/BurgerItem.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";


// @ts-ignore
function BurgerItem({img, name, price, _id}) {
    // @ts-ignore
    const constructorState = useSelector(store => (store.burgerOrderReducer.allCartItems));
    // @ts-ignore
    const getCounts =(mainArray)=> {
        const counts = {};
        for (const num of mainArray) {
            // @ts-ignore
            counts[num._id] = counts[num._id] ? counts[num._id] + 1 : 1;
        }
        return counts;
    }
    const counts = getCounts(constructorState.main)
    // @ts-ignore
    let currentCount = counts[_id];

    // @ts-ignore
    return (
        <div className={styles.item}>
            <img className={`${styles.img} mb-1`} src={img} alt={name}></img>
            {(currentCount && currentCount > 0) &&
            <p className={`${styles.quantity} text text_type_digits-default`}>{currentCount}</p>
            }

            <div className={`${styles.text} mb-1`}>
                <p className="text text_type_digits-default mr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-small">
                {name}
            </p>
        </div>
    );
}
BurgerItem.propTypes= {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
}
export default BurgerItem;