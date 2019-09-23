const { dataRegistry } = require('../../core');

const provideEntity = (entityKey) => dataRegistry.get(
  prefixEntityKey(entityKey)
);

const prefixEntityKey = (entityKey) => `ENTITY_${entityKey}`;

const prefixRepositoryKey = (repositoryKey) => `REPOSITORY_${repositoryKey}`;

module.exports = {
  prefixEntityKey,
  prefixRepositoryKey,
  provideEntity,
};
