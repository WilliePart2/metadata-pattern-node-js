const mongoose = require('mongoose');
const { createModel } = require('../../metadata');
const { entities } = require('../../constants');

const schema = new mongoose.Schema({
    name: String,
    age: Number,
});

const model = createModel({
    key: entities.USER,
    model: mongoose.model('user', schema)
})

module.exports = {
    model,
};