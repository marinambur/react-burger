import React, {FC} from 'react';
import styles from "../BurgerItem/BurgerItem.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
interface BurgerItemPropsInterface {
    _id: string,
    price: number,
    name: string,
    img: string,
    type?: 'bun'|'main'|'sauce'
}
const BurgerItem: FC<BurgerItemPropsInterface> = ({img, name, price, _id}) => {
    const constructorState = useSelector((store: any) => (store.burgerOrderReducer.allCartItems));
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

export default BurgerItem;