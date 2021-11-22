export function setCookie(name: any, value: any, options = {
}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
    // @ts-ignore
    if (options.expires instanceof Date) {
        // @ts-ignore
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        // @ts-ignore
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name: any) {
    setCookie(name, null, { expires: -1 });
}

export function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
const day = (dayCount: number) =>
    dayCount === 0
        ? "Сегодня"
        : dayCount === 1
        ? "Вчера"
        : `${dayCount} дня(-ей) назад`;

export const getDate = (date: string) => {
    const createdAtDate = new Date(date);
    const CurrentDate = new Date().setHours(0, 0, 0, 0);

    const dayCount = Math.ceil(
        (CurrentDate - createdAtDate.getTime()) / (60 * 60 * 24 * 1000)
    );
    const hours =
        createdAtDate.getHours() > 9
            ? createdAtDate.getHours()
            : `0${createdAtDate.getHours()}`;
    const minutes =
        createdAtDate.getMinutes() > 9
            ? createdAtDate.getMinutes()
            : `0${createdAtDate.getMinutes()}`;

    return `${day(dayCount)}, ${hours}:${minutes} i-GMT+${
        (createdAtDate.getTimezoneOffset() * -1) / 60
    }`;
};
export const getTotalPrice = (
    ingredients: any,
) => {
    if (!ingredients) return 0;
    return (
        ingredients?.reduce((total: any, item: any) => total + (item.type==='bun'? item?.price*2 : item.price ), 0)
    );
};

export const getOrderIngredients = (
    ingredients: any,
    ids: string[]
) => {
    if (!ingredients || ingredients.length === 0 || !ids || ids.length === 0)
        return;
    const result = ids.map((id) => {
        const ingredient = ingredients?.filter((item: any) => item._id === id)[0];
        const count = ids.filter((idForCount) => idForCount === id).length;
        if (ingredient) {
            ingredient.count = count;
        }
        return ingredient;
    });
    return result.filter((item) => !!item);
};