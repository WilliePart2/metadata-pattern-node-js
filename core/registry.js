const registriesMap = {};

const createRegistry = (registryKey) => ({
  _servicesMap: registriesMap[registryKey] || {},
  set(key, service) {
    this._servicesMap[key] = service;
  },
  get(key) {
    return this._servicesMap[key].create();
  }
});

const dataRegistry = createRegistry('DATA_REGISTRY');

module.exports = {
  createRegistry,
  dataRegistry,
};
