const { consts } = require('../metadata');

const readDataFromEntityFields = ({ entity, fieldsType }) => {
  const result = {};

  Object.values(entity[consts.FIELDS_MAP])
        .forEach(
          (fieldMap) => result[fieldMap.getField(fieldsType)] = fieldMap.get()
        );

  return result;
};

const writeDataToEntityFields = ({ data, entity, fieldsType }) => {
  Object.values(entity[consts.FIELDS_MAP])
        .forEach((fieldMap) => {
          entity[ fieldMap.getField() ] = data[ fieldMap.getField(fieldsType) ];
        });
};

module.exports = {
  readDataFromEntityFields,
  writeDataToEntityFields,
};
