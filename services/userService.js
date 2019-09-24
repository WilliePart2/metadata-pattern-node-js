const { createService } = require('../metadata');
const { entities } = require('../constants');

const userService = {
    getUserDataFromRequest(request, entity) {
        const { name, age, type } = request.body;

        entity.name = name;
        entity.age = age;
        entity.type = type;
    },

};

module.exports = {
    userService: createService({
        key: entities.USER,
        service: userService,
    })
}
