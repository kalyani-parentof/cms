/**
 * Created by rajanchaudhary on 10/10/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var intervention = new Schema({
    ageGroup : {type: String, ref: 'ageGroup'},
    decisionPoint : {type: String, ref: 'dp'},
    skill : {type: String, ref: 'skill'},
    indicators : [
        {type: String, ref: 'indicator'}
    ],
    ctType : {type: String, ref: 'contentTierCategory'},
    followupCT : String,
    duration : Number,
    canBeMarkedAsDone : Boolean,
    taskName : String,
    taskSteps : [],
    taskObjectives : String,
    dos : [],
    donts : [],
    "reminder" : {type: String},
    "reminderQn" : {type: String},
    "qualifyingQn" : {type: String},
    "user" : {type: String},
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('intervention', intervention);