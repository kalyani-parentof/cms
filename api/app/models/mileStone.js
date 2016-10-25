
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mileStone = new Schema({
    name: String,
    description: String,
    indicators: [{
        indicator:{type: String, ref: 'indicator'},
        trait: {type:String, ref: 'trait'}
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

mongoose.model('mileStone', mileStone);