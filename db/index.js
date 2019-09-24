const { entities } = require('../constants');
const { field, createEntity } = require('./metadata/activeRecord');
const { provideEntity } = require('./metadata/dataDI');
const { createEntityCore } = require('./metadata/standardEntityCore');
const { metadataCore } = require('./metadata/metaCode');
const { userModel } = require('./models');

const userEntity = {
  type: field(),
  name: field()
};

metadataCore({
  models: [
    userModel,
  ],
  entities: [],
  repositories: []
});

createEntity({
  entityKey: entities.USER,
  entity: userEntity,
});

const userBill = provideEntity(entities.USER);
userBill.name = 'Bill';
userBill.type = 'Unemployed';

const userFrank = provideEntity(entities.USER);
userFrank.name = 'Frank';
userFrank.type = 'Employed';

console.log(userBill.name);
console.log(userBill.type);

console.log(userFrank.name);
console.log(userFrank.type);
