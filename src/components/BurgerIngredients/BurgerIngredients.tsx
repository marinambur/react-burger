import React, {useState} from 'react';
import styles from './BurgerIngredients.module.css';
import customScroll from '../BurgerConstructor/BurgerConstructor.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerItem from "../BurgerItem/BurgerItem";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import PropTypes from "prop-types";

function BurgerIngredients(props: any) {
    const [current, setCurrent] = React.useState('one');
    const [ingredientsModal, setIngredientsModal] = useState(false);
    const [info, setInfo] = useState(null);
    const closeIngredientsModal = (e: any) => {
            setIngredientsModal(false);
    }
    const onOverlayClose = (e: any) => {
        e.stopPropagation();
        const overlay = document.getElementById('overlay')
        if (e.target===overlay ) {
            closeIngredientsModal(e)
        }

    }
    const showIngredientsModal = (item: any) => {
        setInfo(item)
        setIngredientsModal(true);
    }
    return (
        <section>
            {ingredientsModal && <Modal onClose={closeIngredientsModal} onOverlayClose={onOverlayClose}  >
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
            <h2 className="text text_type_main-medium mb-2">Булки</h2>
            <div className={styles.constructorContainer}>
                <div className={`${customScroll.customScroll} ${styles.box}`}>
                    <div className={styles.itemBox}>
                        {props.items && props.items.filter((item: { type: string; }) => item.type === 'bun').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>
                            <div key={item._id} onClick={() => {
                                showIngredientsModal(item)}}><BurgerItem img={item.image} name={item.name} price={item.price} /></div>

                        )}
                    </div>
                    <h2 className="text text_type_main-medium mb-2">Соусы</h2>
                    <div className={styles.itemBox}>
                        {props.items && props.items.filter((item: { type: string; }) => item.type === 'sauce').map((item: {
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
const itemsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
});

BurgerIngredients.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(itemsPropTypes)
    ]),
};
export default BurgerIngredients;