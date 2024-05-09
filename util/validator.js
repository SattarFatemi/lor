const errors = require('../config/errors');


class Validator {
    static checkPossibleValue(value, allowedValues) {
        if (!allowedValues.includes(value)) {
            const error = new Error();
            error.message = `${value} is not in ${allowedValues}`;
            error.errorCode = errors.INVALID_VALUE.errorCode;
            throw error;
        }
    }

    static checkEnoughBalanceForAmount(trader, amount) {
        if (trader.balance < amount) {
            const error = new Error();
            error.message = errors.NOT_ENOUGH_BALANCE.message;
            error.errorCode = errors.NOT_ENOUGH_BALANCE.errorCode;
            throw error;
        }
    }

    static checkEnoughBalanceForService(trader, service) {
        if (trader.balance < service.price) {
            const error = new Error();
            error.message = errors.NOT_ENOUGH_BALANCE.message;
            error.errorCode = errors.NOT_ENOUGH_BALANCE.errorCode;
            throw error;
        }
    }
}

module.exports = Validator;
