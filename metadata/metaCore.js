const {
    registerEntityProvider,
    registerModelProvider,
    registerReposytoryProvider,
    registerServiceProvider,
} = require('../core/dataDI');

const metadataCore = ({
    models = [],
    entities = [], 
    repositories = [],
    services = [],
}) => {
    models.forEach(model => {
        registerModelProvider(model);
    });

    repositories.forEach(reposytory => {
        registerReposytoryProvider(reposytory);
    });

    entities.forEach(entity => {
        registerEntityProvider(entity);
    });

    services.forEach(service => {
        registerServiceProvider(service);
    });
};

module.exports = {
    metadataCore,
}