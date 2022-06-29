const helper = {};

helper.convertPrice = (price) => {
    return Number(price).toLocaleString('en');
}

export default helper;