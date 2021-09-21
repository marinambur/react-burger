import React, {useEffect, useState} from 'react';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./AppMain.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
function AppMain() {
    const [data, setData] = useState([]);
    const url = 'https://norma.nomoreparties.space/api/ingredients '
    const getData = () => {
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((data) =>
            setData(data.data),
            )
            .catch((error) => {
                console.log(error)
            });
    }
    useEffect(getData, []);
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
                <div className={styles.burgerBox}>
                    <BurgerIngredients items={data}/>
                    <BurgerConstructor items={data}/>
                </div>
            </div>
        </main>
    );
}

export default AppMain;