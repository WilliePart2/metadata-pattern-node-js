const mongoose = require('mongoose');

module.exports = () => mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
