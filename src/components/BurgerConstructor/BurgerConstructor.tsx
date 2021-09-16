import React, {useState} from 'react';
import styles from './BurgerConstructor.module.css';
import customScroll from '../BurgerIngridients/BurgerIngridients.module.css';
import {CheckMarkIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItem from "../BurgerItem/BurgerItem";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

function BurgerConstructor(props: any) {
    const [current, setCurrent] = React.useState('one');
    const [orderModal, setOrderModal] = useState(false);
    const makeOrder = () => {
        setOrderModal(!orderModal);
    }
    return (
        <section>
            {orderModal && <Modal onClose={makeOrder} >
                <div className={styles.box1}>
                    <p className={`${styles.glow} text text_type_digits-large mb-8`}>034536</p>
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
            </Modal>}
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
                        {props.items.data && props.items.data.filter((item: { type: string; }) => item.type === 'bun').map((item: { image: any; name: any; price: any; }, index: any) =>
                            <div onClick={makeOrder}><BurgerItem key={index} img={item.image} name={item.name} price={item.price} /></div>

                        )}
                    </div>
                    <h2 className="text text_type_main-medium mb-2">Соусы</h2>
                    <div className={styles.itemBox}>
                        {props.items.data && props.items.data.filter((item: { type: string; }) => item.type === 'sauce').map((item: { image: any; name: any; price: any; }, index: any) =>
                            <div onClick={makeOrder}><BurgerItem key={index} img={item.image} name={item.name} price={item.price} /></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;