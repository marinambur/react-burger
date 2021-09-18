import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css'
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
function BurgerConstructor(props: any) {
    const [orderModal, setOrderModal] = useState(false);
    const makeOrder = () => {
        setOrderModal(!orderModal);
    }
    const onOverlayClose = (e: any) => {
        e.stopPropagation();
        const overlay = document.getElementById('overlay')
        if (e.target===overlay ) {
            makeOrder()
        }

    }
    return (
        <div className={`mt-3`}>
            {orderModal && <Modal onClose={makeOrder} onOverlayClose={onOverlayClose} >
       <OrderDetails></OrderDetails>
            </Modal>}
            <div className={`mb-20`} style={{ display: 'flex', flexDirection: 'column' }}>
                {props.items && props.items.filter((item: { type: string; name: string; }) => item.type === 'bun' && item.name==='Краторная булка N-200i').map((item: { _id: React.Key | null | undefined; name: any; price: number; image: string; }, index: any) =>
                    <ConstructorElement
                        key={index}
                        type="top"
                        isLocked={true}
                        text={`${item.name} (верх)`}
                        price={item.price}
                        thumbnail={item.image}
                    />
                )}
                <div className={`${styles.customScroll} mb-4 mt-4`} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginLeft: '-50px' }}>
                    {props.items && props.items.filter((item: { type: string; }) => item.type !== 'bun').map((item: { _id: React.Key | null | undefined; name: string; price: number; image: string; }, index: any) =>
                        <div style={{ display: 'flex' }}  key={index}>
                            <div className='mt-7 mr-6'> <DragIcon type="primary"/></div>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    )}
                </div>
                {props.items && props.items.filter((item: { type: string; name: string; }) => item.type === 'bun' && item.name==='Краторная булка N-200i').map((item: { _id: React.Key | null | undefined; name: any; price: number; image: string; }, index: any) =>
                    <ConstructorElement
                        type="bottom"
                        key={index}
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

BurgerConstructor.propTypes = {
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(itemsPropTypes)
    ]),
};

export default BurgerConstructor;