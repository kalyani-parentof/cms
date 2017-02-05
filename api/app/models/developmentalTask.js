var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var developmentalTask = new Schema({
    name: {type: String,required: true},
    description: String,
    age: {type:String,ref: 'ageGroup'},
    mileStones: [{
        type: String,
        ref: 'mileStone'
    }],
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
developmentalTask.index({ age: 1, name: 1}, { unique: true });
developmentalTask.plugin(uniqueValidator);
mongoose.model('developmentalTask', developmentalTask);