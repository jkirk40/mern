const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Item = new Schema({
    item_description: {
        type: String
    },
    item_responsible: {
        type: String
    },
    item_priority: {
        type: String
    },
    item_complete: {
        type: Boolean
    },
    item_owner:{
        type: String
    }
});

module.exports = mongoose.model('Item', Item);