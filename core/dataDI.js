const { dataRegistry } = require('./registry');
const {
  ENTITY_INJECTION_ID,
  MODEL_INJECTION_ID,
  REPOSYTORY_INJECTION_ID,
  SERVICE_INJECTION_ID,
} = require('../metadata/metaConstants');

const registerEntityProvider = (entityProvider) => dataRegistry.set(
  prefixEntityKey(entityProvider[ENTITY_INJECTION_ID]),
  entityProvider
);

const registerModelProvider = (modelProvider) => dataRegistry.set(
  prefixModelKey(modelProvider[MODEL_INJECTION_ID]),
  modelProvider
);

const registerReposytoryProvider = (reposytoryProvider) => dataRegistry.set(
  prefixRepositoryKey(reposytoryProvider[REPOSYTORY_INJECTION_ID]),
  reposytoryProvider
);

const registerServiceProvider = (serviceProvider) => dataRegistry.set(
  prefixServiceKey(serviceProvider[SERVICE_INJECTION_ID]),
  serviceProvider
);

const provideEntity = (entityKey) => dataRegistry.get(
  prefixEntityKey(entityKey)
);

const provideModel = (modelKey) => dataRegistry.get(
  prefixModelKey(modelKey)
)

const provideRepository = (repositoryKey) => dataRegistry.get(
  prefixRepositoryKey(repositoryKey)
);

const provideService = (serviceKey) => dataRegistry.get(
  prefixServiceKey(serviceKey)
);

const prefixServiceKey = (serviceKey) => `SERVICE_${serviceKey}`;

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
  provideRepository,
  provideService,
  registerEntityProvider,
  registerReposytoryProvider,
  registerModelProvider,
  registerServiceProvider,
};
