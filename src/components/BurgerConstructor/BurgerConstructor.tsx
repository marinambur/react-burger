import React, {useCallback, useMemo} from 'react';
import styles from './BurgerConstructor.module.css';
import {
    CurrencyIcon,
    Button,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import {useDispatch, useSelector} from "react-redux";
import { useDrop } from 'react-dnd';

import {
    ORDER_MODAL_CLOSE,
    DRAG_SORT,
    postData,
    DELETE_ITEM,
} from "../../services/actions/burgerOrder";
import ConstructorDragItem from '../ConstructorDragItem/ConstructorDragItem';
import {useHistory} from "react-router-dom";

function BurgerConstructor() {

    const constructorState = useSelector((store: any) => (store.burgerOrderReducer.allCartItems));
    const orderState = useSelector((store: any) => (store.burgerOrderReducer.order));
    const orderModalState = useSelector((store: any) => (store.burgerOrderReducer.orderModal));
    const history = useHistory();
    const ItemTypes = {
        BOX: 'box',
    }
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.BOX,
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    const totalPrice = useMemo(()=> {
        const array = constructorState.main;
        const arrayBun = constructorState.bun;
        return array.map((item: { type: string; price: number; }) => item.type==='bun' ? item.price*2 : item.price).reduce((a: any, b: any) => a + b, 0) + arrayBun.map((item: { type: string; price: number; }) => item.type==='bun' ? item.price*2 : item.price).reduce((a: any, b: any) => a + b, 0)
    }, [constructorState.main, constructorState.bun])

    function getIngredientIds(array: any[]) {
        return {ingredients: array.map((item) => item._id)};
    }
    const dispatch = useDispatch();
    const auth = useSelector((store: any) => (store.authReducer.reg.login));
    const makeOrder = () => {
        if (!auth) {
            history.replace({ pathname: '/login' });
            return
        }
        if (constructorState.bun.length) {
            const ingredientsIds = getIngredientIds(constructorState.bun).ingredients.concat(getIngredientIds(constructorState.main).ingredients);
            dispatch( postData({ingredients: ingredientsIds}));
        } else {
            alert("Обязательно выберите булку!")
            return;
        }

    }
    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            constructorState.main.splice(hoverIndex, 0,  constructorState.main.splice(dragIndex, 1)[0]);
            dispatch({
                type: DRAG_SORT,
                dragIndex,
                hoverIndex
            })
        },
        [constructorState.main],
    )
    const closeOrderModal = () => {
        dispatch({
            type: ORDER_MODAL_CLOSE,
        })};
    const deleteItem = (id: string) => {
        const filteredArr = constructorState.main.filter((item: { uniqueId: any; }) => item.uniqueId !== id);
        dispatch({
            type: DELETE_ITEM,
            filteredArr
        })};
    return (
        <div className={`mt-3`} ref={drop} role={'Dustbin'}>
                {orderModalState &&  <Modal onClose={closeOrderModal}  >
                    <OrderDetails info={orderState.order}></OrderDetails>
                </Modal>}
                <div className={`mb-20`} style={{ display: 'flex', flexDirection: 'column' }}>
                    {constructorState && constructorState.bun.map((item: any, index: any) =>
                        <ConstructorDragItem delete={deleteItem} key={index} index={index} id={item.uniqueId} moveCard={moveCard} type={'top'} item={item} isLocked={true}>
                        </ConstructorDragItem>
                    )}
                    <div className={`${styles.customScroll} mb-4 mt-4`} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '-50px' }}>
                        {constructorState && constructorState.main.map((item: any, index: any) =>
                            <div style={{ display: 'flex' }}  key={index}>
                                <div className='mt-7 mr-6'> <DragIcon type="primary"/></div>
                                <ConstructorDragItem index={index}  delete={deleteItem} id={item.uniqueId} moveCard={moveCard} item={item} isLocked={false}>
                                </ConstructorDragItem>
                            </div>
                        )}
                    </div>
                    {constructorState && constructorState.bun.map((item: any, index: any) =>
                        <ConstructorDragItem delete={deleteItem} key={index} index={index} id={item.uniqueId} moveCard={moveCard} type={'bottom'} item={item} isLocked={true}>
                        </ConstructorDragItem>

                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div className={`${styles.text} mb-1 mr-10`}>
                        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large" onClick={makeOrder}>
                        Оформить заказ
                    </Button>
                </div>
        </div>
    );
}

export default BurgerConstructor;
