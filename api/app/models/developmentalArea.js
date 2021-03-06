/**
 * Created by rajanchaudhary on 10/11/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var developmentalArea = new Schema({
    name: {type: String ,required: true},
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
developmentalArea.plugin(uniqueValidator);
mongoose.model('developmentalArea', developmentalArea);