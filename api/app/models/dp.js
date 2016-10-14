/**
 * Created by rajanchaudhary on 10/11/16.
 */
/**
 * Created by rajanchaudhary on 10/11/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var dp = new Schema({
    name: String,
    age: {type: String,
    ref: 'ageGroup'},
    indicators: [{
        type: String,
        ref: 'indicator'
    }],
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('dp', dp);