const { consts } = require('../metadata');

// @TODO: here should be provided reading strategies rather that switch case

const readDataFromEntityFields = ({ entity, fieldsType }) => {
  const result = {};

  switch (fieldsType) {
    default:
      Object.values(entity[consts.FIELDS_MAP])
        .forEach(
          (fieldMap) => result[fieldMap.getField()] = fieldMap.get()
        );
  }

  return result;
};

const writeDataToEntityFields = ({ data, entity, fieldsType }) => {
  switch (fieldsType) {
    default:
      // Just copy/past but there should be interface
      // for fetching field name by its type
      Object.values(entity[consts.FIELDS_MAP])
        .forEach((fieldMap) => {
          const targetKey = fieldMap.getField();
          entity[targetKey] = data[targetKey];
        });
  }
};

module.exports = {
  readDataFromEntityFields,
  writeDataToEntityFields,
};
