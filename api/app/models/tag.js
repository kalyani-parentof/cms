var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var tag = new Schema({
    name: {type: String,unique : true,required: true},
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
tag.plugin(uniqueValidator);
mongoose.model('tag', tag);