const servicesConfig = require('../../config/services.json');
const coinStatus = require('../../config/coinStatus');

function findServiceByName(serviceName) {
    for (const service of servicesConfig) {
        if (service.name == serviceName) {
            return service;
        }
    }
    throw new Error("Service not found");
}

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
