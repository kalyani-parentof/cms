
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var developmentalTask = new Schema({
    name: String,

    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('developmentalTask', developmentalTask);