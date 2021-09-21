import React from 'react';
import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";

function IngredientDetails(props: any) {
    return (
        <div className={styles.box}>
            <p className={`${styles.header} text text_type_main-large mb-8`}>Детали ингредиента</p>
            <img src={props.info.image_large} alt={props.info.name}/>
            <p className="text text_type_main-medium mb-15">
                {props.info.name}
            </p>
            <div className={styles.textBox}>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                    <p className="text text_type_digits-default"> {props.info.calories}</p>
                </div>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default"> {props.info.proteins}</p>
                </div>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default"> {props.info.fat}</p>
                </div>
                <div className={styles.info}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default"> {props.info.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}
const infoPropTypes = PropTypes.shape({
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
});
IngredientDetails.propTypes={
    info: infoPropTypes
}
export default IngredientDetails;