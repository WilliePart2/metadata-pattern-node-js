const { provideEntity } = require('./dataDI');

const {
  readDataFromEntityFields,
  writeDataToEntityFields,
} = require('./readWriteHelpers');

const createEntityCore = ({ dbModel, entityKey }) => ({
  _dbModel: dbModel,

  async create(entityStateModel) {
    const createdInst = await this._dbModel.create(
      readDataFromEntityFields({
        entity: entityStateModel
      })
    ).exec();

    entityStateModel.id = createdInst._id;
  },

  async update(entityState) {
    const { id: _id, ...restData } = readDataFromEntityFields({
      entity: entityState,
    });

    await this._dbModel.update({
      _id,
      ...restData
    }).exec();

    return entityState;
  },

  async remove(entityState) {
    const { ok } = await this._dbModel.remove({
      _id: entityState.id,
    }).exec();
  },

  async find(criteria) {
    const data = await this._dbModel.find(criteria).exec();
    return data.map(dataObj => {
      const entity = provideEntity(entityKey);
      writeDataToEntityFields({ data, entity });
      return entity
    });
  }
});

module.exports = {
  createEntityCore,
}
