const { entities } = require('../constants');
const { field, createEntity } = require('./metadata/activeRecord');
const { provideEntity } = require('./metadata/dataDI');

const userEntity = {
  type: field(),
  name: field()
};

createEntity({
  entityKey: entities.USER,
  entityCore: {
    
  },
  model: userEntity,
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
