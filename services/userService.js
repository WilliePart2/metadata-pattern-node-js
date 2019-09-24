const { createService } = require('../metadata');
const { entities, fields } = require('../constants');
const { rw } = require('../lib');

const userService = {
    getUserDataFromRequest(request, entity) {
        rw.writeDataToEntityFields({
            data: request.body,
            entity,
            fieldsType: fields.API_FIELD
        });
    },
};

module.exports = {
    userService: createService({
        key: entities.USER,
        service: userService,
    })
}
