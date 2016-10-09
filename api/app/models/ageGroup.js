
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ageGroup = new Schema({
    name: String,
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ageGroup', ageGroup);