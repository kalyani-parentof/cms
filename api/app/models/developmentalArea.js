/**
 * Created by rajanchaudhary on 10/11/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var developmentalArea = new Schema({
    name: String,
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('developmentalArea', developmentalArea);