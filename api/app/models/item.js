
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var item = new Schema({

    question: String,
    trait:{type: String,
        ref: 'trait'},
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('item', item);