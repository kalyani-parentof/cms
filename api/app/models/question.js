var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var question = new Schema({

    question: {type: String,required: true},
    trait:{type: String,
        ref: 'trait'},
    indicator: {
        type: String,
        ref: 'indicator'
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});
question.plugin(uniqueValidator);
mongoose.model('question', question);