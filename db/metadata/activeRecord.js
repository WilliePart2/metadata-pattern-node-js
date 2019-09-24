const { dataRegistry, createProvider } = require('../../core');
const { prefixEntityKey, provideModel } = require('./dataDI');
const { FIELD_MARKER, FIELDS_MAP, ENTITY_CORE_KEY } = require('./metaConstants');
const { createEntityCore } = require('./standardEntityCore');

const field = () => {
  return {
    [FIELD_MARKER]: true,
  };
};

/**
 * @todo: implement working with several field types + fetching field name by single interface
 */
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

      for (const [fieldName, fieldFn] of Object.entries(target[ENTITY_CORE_KEY])) {
        if (fieldName === key) {
          return fieldFn;
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
  entity,
}) => {
  if (!entityCore) {
    entityCore = createEntityCore({
      dbModel: provideModel(entityKey),
      entityKey,
    })
  }

  dataRegistry.set(
    prefixEntityKey(entityKey),
    createProvider({
      factory: () => {
        let fieldsMap = {};

        Object.entries(entity)
          .forEach(([field, value]) => {
            if (value[FIELD_MARKER]) {
              fieldsMap[field] = createFieldMap({
                field,
                value: undefined,
              });
            }
          });

        entity[FIELDS_MAP] = fieldsMap;
        entity[ENTITY_CORE_KEY] = entityCore;

        return bindFields({
          model: entity,
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
