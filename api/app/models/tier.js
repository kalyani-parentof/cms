/**
 * Created by rajanchaudhary on 10/10/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var tier = new Schema({
    name: {type: String,unique : true,required: true},
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
tier.plugin(uniqueValidator);
mongoose.model('tier', tier);