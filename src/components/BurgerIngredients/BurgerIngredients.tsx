import React, { useEffect } from 'react';
import styles from './BurgerIngredients.module.css';
import {Link, useLocation} from 'react-router-dom';
import customScroll from '../BurgerConstructor/BurgerConstructor.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
    getFeed,
    ITEM_MODAL_CLOSE,
    SHOW_INFO
} from '../../services/actions';
import BurgerDragItem from "../BurgerDragItem/BurgerDragItem";
function BurgerIngredients() {
    const [current, setCurrent] = React.useState('bun');
    // @ts-ignore
    const { items } = useSelector(store => (store.burgerCartReducer.allItems));
    // @ts-ignore
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getFeed())
    }, []);
    const handleScroll = () => {
        const bunHeader = document.getElementById('buns');
        const sauceHeader = document.getElementById('sauce');
        const mainHeader = document.getElementById('main');
        // @ts-ignore
        if (bunHeader && bunHeader.getBoundingClientRect().top > 0 && bunHeader.getBoundingClientRect().top < sauceHeader.getBoundingClientRect().top) {
            setCurrent('bun')
            // @ts-ignore
        } else if (sauceHeader && sauceHeader.getBoundingClientRect().top > 0 && sauceHeader.getBoundingClientRect().top < mainHeader.getBoundingClientRect().top) {
            setCurrent('sauce')
            }
        else {
            setCurrent('main')
        }
    }
    useEffect(() => {
        document.getElementById("box")?.addEventListener("scroll", handleScroll);
        return () => {
            document.getElementById("box")?.addEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    // @ts-ignore
    const isIngredientDetailsModalOpen = useSelector(store => (store.burgerCartReducer.itemModal));
    const showInfo = () => {
        dispatch({
            type: SHOW_INFO,
        })};
    const closeModal = (item: any) => {
        dispatch({
            type: ITEM_MODAL_CLOSE,
        })
    };

    return (
        <section>
        {/*    {isIngredientDetailsModalOpen && <Modal onClose={closeModal} >*/}
        {/*<IngredientDetails info={itemStore}></IngredientDetails>*/}
        {/*    </Modal>}*/}
            <div className={`${styles.section} mb-5`}>
                <Tab value="one" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <h2 className="text text_type_main-medium mb-2"></h2>
            <div className={styles.constructorContainer}>
                <div id='box' className={`${customScroll.customScroll} ${styles.box}`}>
                    <h2 id='buns' className="text text_type_main-medium mb-2" >Булки</h2>
                    <div className={styles.itemBox}>
                        {items && items.filter((item: { type: string; }) => item.type === 'bun').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>
                            <Link key={item._id} to={{
                                pathname: `/ingredients/${item._id}`,
                                state: { background: location }
                            }}>
                         <BurgerDragItem item={item} key={item._id}/>
                            </Link>

                        )}
                    </div>
                    <h2 id='sauce' className="text text_type_main-medium mb-2">Соусы</h2>
                    <div className={styles.itemBox}>
                        {items && items.filter((item: { type: string; }) => item.type === 'sauce').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>

                            <BurgerDragItem  item={item} key={item._id}/>
                        )}
                    </div>
                    <h2 id='main' className="text text_type_main-medium mb-2">Начинки</h2>
                    <div className={styles.itemBox}>
                        {items && items.filter((item: { type: string; }) => item.type === 'main').map((item: {
                            _id: any;
                            image: any; name: any; price: any; }, index: any) =>
                            <BurgerDragItem  item={item} key={item._id}/>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default BurgerIngredients;