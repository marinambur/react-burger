import React, {useContext, useEffect, useState} from 'react';
import styles from './BurgerIngredients.module.css';
import customScroll from '../BurgerConstructor/BurgerConstructor.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItem from "../BurgerItem/BurgerItem";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {TotalPriceContext, IngredientsContext, BurgerIngredientsContext} from '../../services/appContext';
function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one');
    const [ingredientsModal, setIngredientsModal] = useState(false);
    const [info, setInfo] = useState(null);
    const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
    const { burgerIngredients, setBurgerIngredients} = useContext(BurgerIngredientsContext);
    const { ingredients, setIngredients } = useContext(IngredientsContext);
    const closeIngredientsModal = (e: any) => {
            setIngredientsModal(false);
    }

    function getIngredientPrices(array: any[]) {
        return array.map((item) => item.type==='bun' ? item.price*2 : item.price).reduce((a, b) => a + b, 0);
    }
    useEffect( ()=>{setTotalPrice(getIngredientPrices(ingredients))}, [ingredients]);
    const showIngredientsModal = (item: any) => {
        setInfo(item);
        if (item.type==='bun') {
            setIngredients([...ingredients.filter(function (item) { return item.type !== "bun" }), item]);
            } else {
            setIngredients([...ingredients, item]);
        }
        setIngredientsModal(true);
    }

    return (
        <section>
            {ingredientsModal && <Modal onClose={closeIngredientsModal} >
        <IngredientDetails info={info}></IngredientDetails>
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
            <h2 className="text text_type_main-medium mb-2"></h2>
            <div className={styles.constructorContainer}>
                <div className={`${customScroll.customScroll} ${styles.box}`}>
                    <h2 className="text text_type_main-medium mb-2">Булки</h2>
                    <div className={styles.itemBox}>
                        {burgerIngredients && burgerIngredients.filter((item: { type: string; }) => item.type === 'bun').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>
                            <div key={item._id} onClick={() => {
                                showIngredientsModal(item)}}><BurgerItem img={item.image} name={item.name} price={item.price} /></div>

                        )}
                    </div>
                    <h2 className="text text_type_main-medium mb-2">Соусы</h2>
                    <div className={styles.itemBox}>
                        {burgerIngredients && burgerIngredients.filter((item: { type: string; }) => item.type === 'sauce').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>
                            <div key={item._id} onClick={() => {
                                showIngredientsModal(item)}}><BurgerItem img={item.image} name={item.name} price={item.price} /></div>
                        )}
                    </div>
                    <h2 className="text text_type_main-medium mb-2">Начинки</h2>
                    <div className={styles.itemBox}>
                        {burgerIngredients && burgerIngredients.filter((item: { type: string; }) => item.type === 'main').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>
                            <div key={item._id} onClick={() => {
                                showIngredientsModal(item)}}><BurgerItem img={item.image} name={item.name} price={item.price} /></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default BurgerIngredients;