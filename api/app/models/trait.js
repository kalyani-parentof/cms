/**
 * Created by rajanchaudhary on 10/10/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var trait = new Schema({
    name: {type: String,unique : true, required: true},
    description: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
trait.plugin(uniqueValidator);
mongoose.model('trait', trait);

