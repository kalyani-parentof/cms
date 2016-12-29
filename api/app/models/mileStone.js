var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mileStone = new Schema({
    name: {type: String,unique : true,required: true},
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
mileStone.plugin(uniqueValidator);
mongoose.model('mileStone', mileStone);