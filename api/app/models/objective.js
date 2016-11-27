
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var objective = new Schema({
    subItem1: {
        type: String,
        ref: 'subItem'
    },
    subItem2: {
        type: String,
        ref: 'subItem'
    },
    name: String,
    items:[{type: String,
    ref: 'item'}],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('objective', objective);