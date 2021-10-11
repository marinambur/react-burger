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
    DELETE_ITEM,
    DRAG_SORT,
    ORDER_MODAL_CLOSE,
    postData,
} from '../../services/actions';
import ConstructorDragItem from '../ConstructorDragItem/ConstructorDragItem';
export const postUrl = 'https://norma.nomoreparties.space/api/orders';

function BurgerConstructor() {
    // @ts-ignore
    const constructorState = useSelector(store => (store.burgerCartReducer.allCartItems));
    // @ts-ignore
    const orderState = useSelector(store => (store.burgerCartReducer.order));
    // @ts-ignore
    const orderModalState = useSelector(store => (store.burgerCartReducer.orderModal));
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
        // @ts-ignore
        return array.map((item: { type: string; price: number; }) => item.type==='bun' ? item.price*2 : item.price).reduce((a, b) => a + b, 0) + arrayBun.map((item: { type: string; price: number; }) => item.type==='bun' ? item.price*2 : item.price).reduce((a, b) => a + b, 0)
    }, [constructorState.main, constructorState.bun])

    function getIngredientIds(array: any[]) {
        return {ingredients: array.map((item) => item._id)};
    }
    const dispatch = useDispatch();
    const makeOrder = () => {
        if (constructorState.bun.length) {
            const ingredientsIds = getIngredientIds(constructorState.bun).ingredients.concat(getIngredientIds(constructorState.main).ingredients);
            // @ts-ignore
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
    const deleteItem = (id: any) => {
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
                        <ConstructorDragItem key={index} index={index} id={item.uniqueId} moveCard={moveCard} type={'top'} item={item} isLocked={true}>
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
                        <ConstructorDragItem key={index} index={index} id={item.uniqueId} moveCard={moveCard} type={'bottom'} item={item} isLocked={true}>
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
