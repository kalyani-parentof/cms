/**
 * Created by rajanchaudhary on 10/10/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ses = new Schema({
    name: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('ses', ses);