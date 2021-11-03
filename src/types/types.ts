 export interface IBurgerItem {
    _id: string,
    price: number,
    name: string,
    image: string,
    type?: 'bun'|'main'|'sauce',
    uniqueId: string,
    index: string|number,
}