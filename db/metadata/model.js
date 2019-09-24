const { prefixModelKey } = require('./dataDI');
const { dataRegistry, createProvider } = require('../../core');

const createModel = ({ key, model }) => {
    dataRegistry.set(
        prefixModelKey(key),
        createProvider({ value: model })
    );

    return model;
};

module.exports = {
    createModel,
}