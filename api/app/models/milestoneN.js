/**
 * Created by parentof 6 on 20-06-2017.
 */
//npvar uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var Milestone = new Schema({
    name: {type: String, required: true},
    description: String,
    indicators: [{
        indicator:{type: String, ref: 'indicator'},
        trait: {type:String, ref: 'trait'},
        //da: {type: String, ref: 'developmentalArea'},
        //dp: {type: String, ref: 'dp'},
        age: String
    }],
    objectives: [{
        type: String,
        ref: 'objective'
    }],
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

//Milestone.plugin(uniqueValidator);
mongoose.model('milestone', Milestone);
