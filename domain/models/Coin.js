const servicesConfig = require('../../config/services.js');
const coinStatus = require('../../config/coinStatus');
const Util = require('../../util/util');


class Coin {
    constructor(ownerId, serviceName, type) {
        const service = Util.findServiceByName(serviceName);
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
