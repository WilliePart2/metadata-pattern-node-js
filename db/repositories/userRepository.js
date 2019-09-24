const { createReposytory } = require('../../metadata');
const { inject } = require('../../core');
const { entities } = require('../../constants');
const { readDataFromEntityFields } = require('../readWriteHelpers');

const userReposytoryFactory = ({
    userModel = inject({ model: entities.USER })
} = {}) => ({
    async create(userEntity) {
        const entityData = readDataFromEntityFields({
            entity: userEntity,
        });
        
        const createdEntity = await userModel.create(entityData);
        userEntity.id = createdEntity._id;

        return userEntity;
    }
});

module.exports = {
    userRepository: createReposytory({
        key: entities.USER,
        repositoryFactory: userReposytoryFactory,
    }),
}
