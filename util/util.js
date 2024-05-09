const servicesConfig = require('../config/services.js');
const errors = require('../config/errors');


class Util {
    static findServiceByName(serviceName) {
        for (const service of servicesConfig) {
            if (service.name == serviceName) {
                return service;
            }
        }
        const error = new Error();
        error.message = errors.SERVICE_NOT_FOUND.message;
        error.errorCode = errors.SERVICE_NOT_FOUND.errorCode;
        throw error;
    }
}

module.exports = Util;
