export const addCartData = (data) => {
    return ({ type: 'addCartProduct', data: data });
}

export const refreshCart = () => {
    return ({ type: 'refresh' });
}

