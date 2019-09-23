const createProvider = ({ factory, args, sourceClass, value }) => ({
  create() {
    if (factory) {
      return factory(args);
    }

    if (sourceClass) {
      return new sourceClass(args);
    }

    if (value) {
      return value;
    }

    throw new Error('Provided invalid object for provider factory');
  }
});

module.exports = {
  createProvider,
};
