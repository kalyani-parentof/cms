/**
 * Created by rajanchaudhary on 10/10/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var skill = new Schema({
    ageGroup: {type: String, ref: 'ageGroup'},
    decisionPoint: {type: String, ref: 'dp'},
    rank: String,
    name: String,
    description: String,
    indicators: [],
    user: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
skill.plugin(uniqueValidator);
mongoose.model('skill', skill);