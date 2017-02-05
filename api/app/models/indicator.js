/**
 * Created by rajanchaudhary on 10/14/16.
 */
/**
 * Created by rajanchaudhary on 10/11/16.
 */
/**
 * Created by rajanchaudhary on 10/11/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var indicator = new Schema({
    name: {type: String, required: true},
    createdBy: String,
    isPermanent: Boolean,
    dps: [{
        da: {type: String, ref: 'developmentalArea'},
        dp: {type: String, ref: 'dp'}
    }],
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
indicator.plugin(uniqueValidator);
mongoose.model('indicator', indicator);