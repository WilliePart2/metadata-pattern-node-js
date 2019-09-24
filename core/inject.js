const { provideEntity, provideModel, provideRepository } = require('./dataDI');

const inject = ({ entity, reposytory, dto, model }) => {
    if (entity) {
        return provideEntity(entity);
    }

    if (reposytory) {
        return provideRepository(reposytory);
    }

    if (model) {
        return provideModel(model);
    }

    if (dto) {
        // it's just cork
        return null;
    }
}

module.exports = {
    inject,
}
