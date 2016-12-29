/**
 * Created by rajanchaudhary on 10/11/16.
 */
/**
 * Created by rajanchaudhary on 10/11/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var functionality = new Schema({
    name: {type: String,unique : true,required: true},
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
functionality.plugin(uniqueValidator);
mongoose.model('functionality', functionality);