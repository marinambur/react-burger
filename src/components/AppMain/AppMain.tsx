import React from 'react';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./AppMain.module.css";
function AppMain() {
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                <div className={styles.burgerBox}>
                    <BurgerConstructor />
                </div>

            </div>
        </main>
    );
}

export default AppMain;