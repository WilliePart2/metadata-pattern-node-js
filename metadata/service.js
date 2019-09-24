const { createProvider } = require('../core');
const { SERVICE_INJECTION_ID } = require('./metaConstants');

const createService = ({ key, service }) => {
    const serviceProvider = createProvider({
        value: service,
    });
    serviceProvider[SERVICE_INJECTION_ID] = key;

    return serviceProvider;
}

module.exports = {
    createService,
}