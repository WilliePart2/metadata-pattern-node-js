const { createEntity, field } = require('../../metadata');
const { entities } = require('../../constants');

const userEntity = createEntity({
    entityKey: entities.USER,
    entity: {
        name: field(),
        age: field(),
        type: field()
    }
});

module.exports = {
    userEntity,
};
