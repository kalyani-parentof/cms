var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mileStone = new Schema({
    name: {type: String,unique : true,required: true},
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

mileStone.index({"indicators.indicator": 1, "indicators.trait": 1}, { unique: true })
mileStone.plugin(uniqueValidator);
mongoose.model('mileStone', mileStone);