const servicesConfig = require('../../config/services.js');
const coinStatus = require('../../config/coinStatus');
const Util = require('../../util/util');


class Coin {
    constructor(ownerId, serviceName, type) {
        const service = Util.findServiceByName(serviceName);
        this.ownerId = ownerId;
        this.amountBasedOnOneUnit = service.price;
        this.status = coinStatus.NEW;
        this.type = type;
        this.serviceName = serviceName;
    }

    toDB() {
        return {
            ownerId: this.ownerId,
            amountBasedOnOneUnit: this.amountBasedOnOneUnit,
            status: this.status,
            type: this.type,
            serviceName: this.serviceName,
            nextInCooperationRing: this.nextInCooperationRing,
            prevInCooperationRing: this.prevInCooperationRing,
        }
    }
}

module.exports = Coin;
