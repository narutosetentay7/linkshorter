const { Schema, model } = require('mongoose');

const LinkSchema = new Schema({
    url: String,
    id: String
});

module.exports = Link = model('Link', LinkSchema);
