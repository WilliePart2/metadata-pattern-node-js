const { createProvider, inject } = require('../core');
const {
  FIELD_MARKER,
  FIELDS_MAP,
  ENTITY_CORE_KEY,
  ENTITY_INJECTION_ID,
} = require('./metaConstants');

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
        // console.log(fieldName, fieldFn, key);
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
  const entityProvider = createProvider({
    factory: () => {
      if (!entityCore) {
        entityCore = inject({ reposytory: entityKey });
      }

      let fieldsMap = {
        id: createFieldMap({ field: 'id' }),
      };

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
  });
  entityProvider[ENTITY_INJECTION_ID] = entityKey;

  return entityProvider;
};

module.exports = {
  field,
  createEntity,
};
