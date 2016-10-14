/**
 * Created by rajanchaudhary on 10/11/16.
 */
/**
 * Created by rajanchaudhary on 10/11/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var functionality = new Schema({
    name: String,
    code: String,
    characteristic: [{
        type: String,
        ref: 'characteristic'
    }],
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('functionality', functionality);