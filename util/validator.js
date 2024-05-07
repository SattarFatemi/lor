class Validator {
    static checkPossibleValue(value, allowedValues) {
        if (!allowedValues.includes(value)) {
            throw new Error(`${value} is not in ${allowedValues}`);
        }
    }
}

module.exports = Validator;
