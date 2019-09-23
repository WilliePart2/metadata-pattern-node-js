const { dataRegistry, createProvider } = require('../../core');
const { prefixEntityKey } = require('./dataDI');
const { FIELD_MARKER, FIELDS_MAP } = require('./metaConstants');

const field = () => {
  return {
    [FIELD_MARKER]: true,
  };
};

const createFieldMap = ({ field, value }) => ({
  _field: field,
  _value: value,
  get() {
    return this._value;
  },
  set(value) {
    this._value = value;
  },
  getField() {
    return this._field;
  }
});

const bindFields = ({ model, fieldsMap }) => {
  return new Proxy(model, {
    get(target, key, context) {
      for (const [fieldName, fieldMap] of Object.entries(fieldsMap)) {
        if (fieldMap.getField() === key) {
          return fieldMap.get();
        }
      }

      if (Reflect.has(target, key)) {
        return Reflect.get(target, key);
      }
    },
    set(target, key, value, context) {
      for (const [fieldName, fieldMap] of Object.entries(fieldsMap)) {
        if (fieldMap.getField() === key) {
          fieldMap.set(value);
          return true;
        }
      }

      if (Reflect.has(target, key)) {
        return Reflect.set(target, key, value);
      }
    }
  });
};

const createEntity = ({
  entityKey,
  entityCore,
  model,
}) => {
  dataRegistry.set(
    prefixEntityKey(entityKey),
    createProvider({
      factory: () => {
        let fieldsMap = {};

        Object.entries(model)
          .forEach(([field, value]) => {
            if (value[FIELD_MARKER]) {
              fieldsMap[field] = createFieldMap({
                field,
                value: undefined,
              });
            }
          });

        model[FIELDS_MAP] = fieldsMap;

        return bindFields({
          model,
          fieldsMap,
        });
      },
    })
  );
};

module.exports = {
  field,
  createEntity,
};
