
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ageGroup = new Schema({
    name: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ageGroup', ageGroup);