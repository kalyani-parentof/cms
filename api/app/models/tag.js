
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var tag = new Schema({
    name: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('tag', tag);