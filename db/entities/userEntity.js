const { createEntity, field } = require('../../metadata');
const { entities, fields } = require('../../constants');

const userEntity = createEntity({
    entityKey: entities.USER,
    entity: {
        name: field({ [fields.API_FIELD]: 'firstName' }),
        age: field({ [fields.API_FIELD]: 'years' }),
        type: field({ [fields.API_FIELD]: 'job' })
    }
});

module.exports = {
    userEntity,
};
