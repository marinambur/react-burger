import React from 'react';
import styles from './BurgerConstructor.module.css';
import customScroll from '../BurgerIngridients/BurgerIngridients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItem from "../BurgerItem/BurgerItem";
import {items} from "../../utils/data";

function BurgerConstructor() {
    const [current, setCurrent] = React.useState('one')
    return (
        <section>
            <div className={`${styles.section} mb-5`}>
                    <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                        Начинки
                    </Tab>
            </div>
            <h2 className="text text_type_main-medium mb-2">Булки</h2>
            <div className={styles.constructorContainer}>
                <div className={`${customScroll.customScroll} ${styles.box}`}>
                    <div className={styles.itemBox}>
                        {items.filter(item => item.type === 'bun').map((item, index) =>
                            <BurgerItem key={index} img={item.image} name={item.name} price={item.price} />
                        )}
                    </div>
                    <h2 className="text text_type_main-medium mb-2">Соусы</h2>
                    <div className={styles.itemBox}>
                        {items.filter(item => item.type === 'sauce').map((item, index) =>
                                <BurgerItem key={index} img={item.image} name={item.name} price={item.price} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;