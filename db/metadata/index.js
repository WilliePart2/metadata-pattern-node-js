const { createModel } = require('./model');
const { createEntity, field } = require('./activeRecord');
const { provideEntity, provideModel } = require('./dataDI');

module.exports = {
    createModel,
    createEntity,
    field,
    provideEntity,
    provideModel,
};
