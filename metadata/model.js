const { MODEL_INJECTION_ID } = require('./metaConstants');
const { createProvider } = require('../core');

const createModel = ({ key, model }) => {
    const modelProvider = createProvider({ value: model });
    modelProvider[MODEL_INJECTION_ID] = key;

    return modelProvider;
};

module.exports = {
    createModel,
}