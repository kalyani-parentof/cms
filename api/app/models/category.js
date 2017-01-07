/**
 * Created by rajanchaudhary on 1/7/17.
 */

var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var category = new Schema({
    name: {type: String,unique : true, required: true},
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
category.plugin(uniqueValidator);
mongoose.model('category', category);

