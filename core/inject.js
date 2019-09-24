const {
    provideEntity,
    provideModel,
    provideRepository,
    provideService,
} = require('./dataDI');

const inject = ({ entity, reposytory, model, service }) => {
    if (entity) {
        return provideEntity(entity);
    }

    if (reposytory) {
        return provideRepository(reposytory);
    }

    if (model) {
        return provideModel(model);
    }

    if (service) {
        return provideService(service);
    }
}

module.exports = {
    inject,
}
