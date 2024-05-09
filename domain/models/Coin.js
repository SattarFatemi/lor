const servicesConfig = require('../../config/services.js');
const coinStatus = require('../../config/coinStatus');


class Coin {
    constructor(ownerId, serviceName, type) {
        const service = findServiceByName(serviceName);
        this.ownerId = ownerId;
        this.amountBasedOnOneUnit = service.price;
        this.status = coinStatus.NEW;
        this.serviceName = serviceName;
    }

    toDB() {
        return {
            ownerId: this.ownerId,
            amountBasedOnOneUnit: this.amountBasedOnOneUnit,
            status: this.status,
            serviceName: this.serviceName,
        }
    }
}

module.exports = Coin;
