const common = {};

common.currencyFormatter = (amount, currency) => {
    try {
        return (amount).toLocaleString('en-US', {
            style: 'currency',
            currency: currency,
        });
    }catch(e){
        return amount;
    }
}

export default common;