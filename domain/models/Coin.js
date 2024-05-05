const servicesConfig = require('../../config/services.json');
const coinStatus = require('../../config/coinStatus');

function findServiceByName(serviceName) {
    for (const service of servicesConfig) {
        if (service.name == serviceName) {
            return service;
        }
    }
    // TODO raise error
}

class Coin {
    constructor(id, ownerId, serviceName, type) {
        const service = findServiceByName(serviceName);
        this.id = id;
        this.ownerId = ownerId;
        this.amountBasedOnOneUnit = service.price;
        this.status = coinStatus.NEW;
        this.serviceName = serviceName;
    }
}

module.exports = Coin;
