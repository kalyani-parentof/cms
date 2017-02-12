/**
 * Created by rajanchaudhary on 10/11/16.
 */
/**
 * Created by rajanchaudhary on 10/11/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var dp = new Schema({
    name: {type: String ,required: true},
    age: {type: String,
    ref: 'ageGroup'},
    da: {type: String, ref: 'developmentalArea'},
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    image: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
dp.index({age: 1, name: 1}, {unique: true})
dp.plugin(uniqueValidator);
mongoose.model('dp', dp);