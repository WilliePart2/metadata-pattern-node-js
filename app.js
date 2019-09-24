const express = require('express');
const bodyParser = require('body-parser');
const {
  models,
  entities: dbEntities,
  repositories,
  connection,
} = require('./db');
const services = require('./services');
const { inject } = require('./core');
const { entities } = require('./constants');
const { metadataCore } = require('./metadata');
const routes = require('./routes');

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
  ],
  services: [
    services.userService,
  ]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

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
