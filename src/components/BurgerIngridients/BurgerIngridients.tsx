import React, {useState} from 'react';
import styles from './BurgerIngridients.module.css'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
function BurgerIngredients(props: any) {
    const [orderModal, setOrderModal] = useState(false);
    const makeOrder = () => {
        setOrderModal(!orderModal);
    }
    return (
        <div className={`mt-3`}>
            {orderModal && <Modal onClose={makeOrder} ></Modal>}
            <div className={`mb-20`} style={{ display: 'flex', flexDirection: 'column' }}>
                {props.items.data && props.items.data.filter((item: { type: string; name: string; }) => item.type === 'bun' && item.name==='Краторная булка N-200i').map((item: { _id: React.Key | null | undefined; name: any; price: number; image: string; }, index: any) =>
                    <ConstructorElement
                        key={item._id}
                        type="top"
                        isLocked={true}
                        text={`${item.name} (верх)`}
                        price={item.price}
                        thumbnail={item.image}
                    />
                )}
                <div className={`${styles.customScroll} mb-4 mt-4`} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '-50px' }}>
                    {props.items.data && props.items.data.filter((item: { type: string; }) => item.type !== 'bun').map((item: { _id: React.Key | null | undefined; name: string; price: number; image: string; }, index: any) =>
                        <div style={{ display: 'flex' }}  key={item._id}>
                            <div className='mt-7 mr-6'> <DragIcon type="primary"/></div>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    )}
                </div>
                {props.items.data && props.items.data.filter((item: { type: string; name: string; }) => item.type === 'bun' && item.name==='Краторная булка N-200i').map((item: { _id: React.Key | null | undefined; name: any; price: number; image: string; }, index: any) =>
                    <ConstructorElement
                        type="bottom"
                        key={item._id}
                        isLocked={true}
                        text={`${item.name} (низ)`}
                        price={item.price}
                        thumbnail={item.image}
                    />
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className={`${styles.text} mb-1 mr-10`}>
                    <p className="text text_type_digits-medium mr-2">610</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={makeOrder}>
                    Оформить заказ
                </Button>
            </div>

        </div>
    );
}

export default BurgerIngredients;