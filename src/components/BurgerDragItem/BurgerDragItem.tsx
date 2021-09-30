import React from 'react';
import BurgerItem from "../BurgerItem/BurgerItem";
import {useDrag} from "react-dnd";
import {ADD_BUN, ADD_MAIN} from "../../services/actions";
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from "uuid";

// @ts-ignore
const BurgerDragItem = ({item, onAdd, show}) => {
    const ItemTypes = {
        BOX: 'box',
    }
const dispatch = useDispatch();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BOX,
        item,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && item.type === 'bun') {
                dispatch({
                    type: ADD_BUN,
                    item
                });
            } else if (item && dropResult && item.type !== 'bun') {
                const uniqueId = uuidv4();
                const newItem = {...item, uniqueId}
                dispatch({
                    type: ADD_MAIN,
                    newItem
                })
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const opacity = isDragging ? 0.4 : 1;
    // @ts-ignore
    return (
        <div key={item._id} ref={drag} role="Box" style={{opacity}} onClick={() => {onAdd(item); show(item)}}>
            <BurgerItem img={item.image} name={item.name} price={item.price} _id={item._id}/>
        </div>
    );
};

export default BurgerDragItem;