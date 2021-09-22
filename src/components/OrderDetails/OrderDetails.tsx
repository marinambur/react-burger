import React, {useContext} from 'react';
import styles from "./OrderDetails.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderContext} from "../../services/appContext";

function OrderDetails() {
    const { response, setResponse } = useContext(OrderContext);
    return (
        <div className={styles.box}>
            <p className={`${styles.glow} text text_type_digits-large mb-8`}>{response.order.number}</p>
            <p className="text text_type_main-medium mb-15">
                Идентификатор заказа
            </p>
            <div className={`${styles.tick} mb-15`}><CheckMarkIcon type="primary" /></div>
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

export default OrderDetails;