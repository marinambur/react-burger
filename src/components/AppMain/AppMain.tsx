import React, {useEffect, useState} from 'react';
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import styles from "./AppMain.module.css";
import BurgerIngredients from "../BurgerIngridients/BurgerIngridients";
function AppMain() {
    const [data, setData] = useState([]);

    const getData = () => {

        fetch('https://norma.nomoreparties.space/api/ingredients ')
            .then((res) => res.json())
            .then((data) =>
            setData(data),
            )
            .catch((e) => {
                console.log('ошибка')
            });
    }
    useEffect(getData, []);
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                <div className={styles.burgerBox}>
                    <BurgerConstructor items={data}/>
                    <BurgerIngredients items={data}/>
                </div>
            </div>
        </main>
    );
}

export default AppMain;