/**
 * Created by rajanchaudhary on 10/10/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var gender = new Schema({
    name: {type: String,unique : true,required: true},
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
gender.plugin(uniqueValidator);
mongoose.model('gender', gender);