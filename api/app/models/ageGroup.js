var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ageGroup = new Schema({
    name: {type: String,unique : true,required: true},
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
ageGroup.plugin(uniqueValidator);
mongoose.model('ageGroup', ageGroup);