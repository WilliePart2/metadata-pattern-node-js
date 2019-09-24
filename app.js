const express = require('express');
const {
  models,
  entities: dbEntities,
  repositories,
  connection,
} = require('./db');
const { inject } = require('./core');
const { entities } = require('./constants');
const { metadataCore } = require('./metadata');

const app = express();
connection();

metadataCore({
  models: [
    models.userModel,
  ],
  entities: [
    dbEntities.userEntity,
  ],
  repositories: [
    repositories.userRepository,
  ]
});

const userFrank = inject({ entity: entities.USER });
userFrank.name = 'Frank';
userFrank.type = 'Employed';

;(async () => {
  const newUser = await userFrank.create(userFrank);
})();


const port = 3000;
app.listen(port, () => {
  console.log(`App listens on: ${port} port`);
});
