import React from 'react';
import styles from "./IngredientDetails.module.css";

function IngredientDetails(props: any) {
    return (
        <div className={styles.box}>
            <p className={`${styles.header} text text_type_main-large mb-8`}>Детали ингредиента</p>
            <img src="https://code.s3.yandex.net/react/code/meat-04-large.png"/>
            <p className="text text_type_main-medium mb-15">
                Биокотлета из марсианской Магнолии
            </p>
            <div className={styles.textBox}>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default">244,4</p>
                </div>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default">12,2</p>
                </div>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default">17,2</p>
                </div>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default">10,2</p>
                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;