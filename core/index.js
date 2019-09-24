const { createProvider } = require('./provider');
const { dataRegistry, createRegistry } = require('./registry');
const { inject } = require('./inject');

module.exports = {
  createProvider,
  createRegistry,
  dataRegistry,
  inject,
};
