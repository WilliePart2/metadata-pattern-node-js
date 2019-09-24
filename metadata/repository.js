const { createProvider } = require('../core');
const { REPOSYTORY_INJECTION_ID } = require('./metaConstants');

const createReposytory = ({ key, repositoryFactory }) => {
    const reposytoryProvider = createProvider({ factory: repositoryFactory })
    reposytoryProvider[REPOSYTORY_INJECTION_ID] = key;

    return reposytoryProvider;
};

module.exports = {
    createReposytory,
};
