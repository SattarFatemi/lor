class Coin {
    constructor(id, amountBasedOnOneUnit, status, type, owner) {
        this.id = id;
        this.amountBasedOnOneUnit = amountBasedOnOneUnit;
        this.status = status;
        this.type = type;
        this.nextInCR = nextInCR;
        this.owner = owner;
    }
}

module.exports = Coin;
