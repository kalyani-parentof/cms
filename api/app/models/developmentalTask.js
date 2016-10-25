
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var developmentalTask = new Schema({
    name: String,
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

mongoose.model('developmentalTask', developmentalTask);