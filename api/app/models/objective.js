
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var objective = new Schema({
    name: String,
    code: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('objective', objective);