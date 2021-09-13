import React from 'react';
import styles from './BurgerIngridients.module.css'
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {items} from "../../utils/data";
function BurgerIngredients(props: any) {
    return (
        <div className={`mt-3`}>
            <div className={`mb-20`} style={{ display: 'flex', flexDirection: 'column' }}>
                {items.filter(item => item.type === 'bun' && item.name==='Краторная булка N-200i').map((item, index) =>
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
                    {items.filter(item => item.type !== 'bun').map((item, index) =>
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
                {items.filter(item => item.type === 'bun' && item.name==='Краторная булка N-200i').map((item, index) =>
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
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>

        </div>
    );
}

export default BurgerIngredients;