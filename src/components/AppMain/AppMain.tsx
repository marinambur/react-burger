import React, {useEffect, useState} from 'react';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./AppMain.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
function AppMain() {

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                <div className={styles.burgerBox}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </div>
        </main>
    );
}

export default AppMain;