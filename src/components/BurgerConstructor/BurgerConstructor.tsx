import React, {useState} from 'react';
import styles from './BurgerConstructor.module.css';
import customScroll from '../BurgerIngridients/BurgerIngridients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItem from "../BurgerItem/BurgerItem";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

function BurgerConstructor(props: any) {
    const [current, setCurrent] = React.useState('one');
    const [ingredientsModal, setIngredientsModal] = useState(false);
    const [info, setInfo] = useState([])
    const showIngredientsModal = (item: any) => {
        console.log(item)
        setIngredientsModal(!ingredientsModal);


    }
    return (
        <section>
            {ingredientsModal && <Modal onClose={showIngredientsModal} >
        <IngredientDetails></IngredientDetails>
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
                            <div onClick={showIngredientsModal}><BurgerItem key={index} img={item.image} name={item.name} price={item.price} /></div>

                        )}
                    </div>
                    <h2 className="text text_type_main-medium mb-2">Соусы</h2>
                    <div className={styles.itemBox}>
                        {props.items.data && props.items.data.filter((item: { type: string; }) => item.type === 'sauce').map((item: { image: any; name: any; price: any; }, index: any) =>
                            <div onClick={showIngredientsModal}><BurgerItem key={index} img={item.image} name={item.name} price={item.price} /></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BurgerConstructor;