
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var taxonomyCategory = new Schema({
    name: {type: String,unique : true, required: true},
    description: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
taxonomyCategory.plugin(uniqueValidator);
mongoose.model('taxonomyCategory', taxonomyCategory);

