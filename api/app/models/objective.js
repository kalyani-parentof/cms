var uniqueValidator = require('mongoose-unique-validator');
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
    name: {type: String, required: true},
    derivative: String,
    itemName: String,
    questions: [
         {
            type: String,
            ref: 'question'
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now
    }
});



objective.plugin(uniqueValidator);
mongoose.model('objective', objective);