var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var question = new Schema({

    question: {type: String,unique : true,required: true},
    trait:{type: String,
        ref: 'trait'},
    createdDate: {
        type: Date,
        default: Date.now
    }
});
question.plugin(uniqueValidator);
mongoose.model('question', question);