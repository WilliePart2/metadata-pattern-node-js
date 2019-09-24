const { dataRegistry } = require('../../core');

const provideEntity = (entityKey) => dataRegistry.get(
  prefixEntityKey(entityKey)
);

const provideModel = (modelKey) => dataRegistry.get(
  prefixModelKey(modelKey)
)

const prefixModelKey = (modelKey) => `MODEL_${modelKey}`;

const prefixEntityKey = (entityKey) => `ENTITY_${entityKey}`;

const prefixRepositoryKey = (repositoryKey) => `REPOSITORY_${repositoryKey}`;

const prefixDTOKey = (dtoKey) => `DTO_${dtoKey}`;

module.exports = {
  prefixEntityKey,
  prefixRepositoryKey,
  prefixDTOKey,
  prefixModelKey,
  provideEntity,
  provideModel,
};
