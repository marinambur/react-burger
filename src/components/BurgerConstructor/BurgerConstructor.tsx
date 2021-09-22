import React, {useContext, useState} from 'react';
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
import {IngredientsContext, TotalPriceContext, OrderContext} from '../../services/appContext';
function BurgerConstructor(props: any) {
    const [orderModal, setOrderModal] = useState(false);
    const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
    const { ingredients, setIngredients } = useContext(IngredientsContext);
    const [response, setResponse] = React.useState({success: true, order: {number: 0}, name: 'name'})

    function getIngredientIds(array: any[]) {
        return {ingredients: array.map((item) => item._id)};
    }

    const postUrl = 'https://norma.nomoreparties.space/api/orders';
    const postData = () => {
        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                 getIngredientIds(ingredients)
            )
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .then((data) =>
                setResponse(data),
            )
            .catch((error) => {
                console.log(error)
            });
    }
    const closeModalWindow = () => {
        setOrderModal(false);
    }
    const openModalWindow = () => {
        setOrderModal(true);
    }
    const makeOrder = () => {

        if (ingredients.some((item)=> item.type==='bun')) {

            postData();
            setTimeout(openModalWindow, 500);
        } else {
            alert("Обязательно выберите булку!")
            return;
        }

    }

    return (
        <div className={`mt-3`}>
            <OrderContext.Provider value={{response, setResponse}}>
            {orderModal && <Modal onClose={closeModalWindow}  >
       <OrderDetails></OrderDetails>
            </Modal>}
            <div className={`mb-20`} style={{ display: 'flex', flexDirection: 'column' }}>
                {ingredients && ingredients.filter((item: { type: string; name: string; }) => item.type === 'bun').map((item: { _id: React.Key | null | undefined; name: any; price: number; image: string; }, index: any) =>
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
                    {ingredients && ingredients.filter((item: { type: string; }) => item.type !== 'bun').map((item: { _id: React.Key | null | undefined; name: string; price: number; image: string; }, index: any) =>
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
                {ingredients && ingredients.filter((item: { type: string; name: string; }) => item.type === 'bun').map((item: { _id: React.Key | null | undefined; name: any; price: number; image: string; }, index: any) =>
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
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={makeOrder}>
                    Оформить заказ
                </Button>
            </div>
            </OrderContext.Provider>
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