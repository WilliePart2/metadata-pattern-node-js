const {
    registerEntityProvider,
    registerModelProvider,
    registerReposytoryProvider,
} = require('../core/dataDI');

const metadataCore = ({ models, entities, repositories }) => {
    models.forEach(model => {
        registerModelProvider(model);
    });

    repositories.forEach(reposytory => {
        registerReposytoryProvider(reposytory);
    });

    entities.forEach(entity => {
        registerEntityProvider(entity);
    });
};

module.exports = {
    metadataCore,
}