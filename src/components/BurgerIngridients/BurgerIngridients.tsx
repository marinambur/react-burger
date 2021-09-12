import React from 'react';
import styles from './BurgerIngridients.module.css'
import {ConstructorElement, CurrencyIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {items} from "../../utils/data";
function BurgerIngredients(props: any) {
    return (
        <div>
            <div className={`${styles.customScroll} mb-10`} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((item, index) =>
                    <ConstructorElement
                        key={index}
                        text={item.name}
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