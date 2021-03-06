import React, {useEffect} from 'react';
import styles from "./IngredientDetails.module.css";
import {useDispatch, useSelector} from "../../types/types";
import {useParams} from "react-router-dom";
import {getFeed} from "../../services/actions";

function IngredientDetails() {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getFeed())
    }, [dispatch]);
    const items = useSelector((store: any) => (store.burgerCartReducer.allItems.items));
    // @ts-ignore
    let ID = useParams().id;
    const info = items.filter((item: { _id: string; }) => item._id === ID)[0];
    return (
        <>
            {info &&       <div className={styles.box}>
                <p className={`${styles.header} text text_type_main-large mb-8`}>Детали ингредиента</p>
                <img src={info.image_large} alt={info.name}/>
                <p className="text text_type_main-medium mb-15">
                    {info.name}
                </p>
                <div className={styles.textBox}>
                    <div className={styles.info}>
                        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
                        <p className="text text_type_digits-default"> {info.calories}</p>
                    </div>
                    <div className={styles.info}>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_digits-default"> {info.proteins}</p>
                    </div>
                    <div className={styles.info}>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_digits-default"> {info.fat}</p>
                    </div>
                    <div className={styles.info}>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_digits-default"> {info.carbohydrates}</p>
                    </div>
                </div>
            </div>}

        </>

    );
}
export default IngredientDetails;