var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mileStone = new Schema({
    name: {type: String, required: true},
    description: String,
    indicators: [{
        indicator:{type: String, ref: 'indicator'},
        taxonomyCategory:{type:String, ref: 'taxonomyCategory'},
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

mileStone.plugin(uniqueValidator);
mongoose.model('mileStone', mileStone);