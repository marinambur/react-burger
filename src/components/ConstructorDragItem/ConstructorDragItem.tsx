import React, {FC} from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {IBurgerItem} from "../../types/types";
export const ItemTypes = {
    CARD: 'card',
}
interface ConstructorDragItemPropsInterface {
    item: IBurgerItem,
    moveCard: (drugIndex: number, hoverIndex: number)=>void,
    isLocked: boolean,
    index: number,
    id: string,
    type?: 'top'|'bottom',
    delete: (id: string)=> void,
}
const ConstructorDragItem: FC<ConstructorDragItemPropsInterface> = (props) => {
    const ref = useRef(null);
    const id = props.id;
    const index = props.index;
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }

            // @ts-ignore
            const dragIndex = item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return;
            }

            // @ts-ignore
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            // @ts-ignore
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            props.moveCard(dragIndex, hoverIndex);
            // @ts-ignore
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    return (
        <div key={props.item.index} ref={ref}>
            <ConstructorElement
                handleClose={()=> {
                    props.delete(props.item.uniqueId)}
                }
                type={props.type}
                isLocked={props.isLocked}
                text={`${props.item.name} ${ props.type === 'top' ? "(верх)" : (props.type === 'bottom' ? '(низ)' : '') }`}
                price={props.item.price}
                thumbnail={props.item.image}
            />
        </div>
    );
};


export default ConstructorDragItem;