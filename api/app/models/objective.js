
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var objective = new Schema({
    func1: {
        type: String,
        ref: 'functionality'
    },
    func2: {
        type: String,
        ref: 'functionality'
    },
    char1: {
        type: String,
        ref: 'characteristic'
    },
    char2:{type: String,
        ref: 'characteristic'
    },
    trait: {
        type: String,
        ref: 'trait'
    },
    indicator: {type: String, ref: 'indicator'},
    code: String,
    item: String,
    question: String,
    intervention: String,
    noOfDay: String,
    noOfTime: String,
    intervention2: String,
    noOfDay2: String,
    noOfTime2: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('objective', objective);