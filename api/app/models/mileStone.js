
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mileStone = new Schema({
    name: String,
    description: String,
    indicators: [{
        indicator: String,
        trait: String
    }],
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('mileStone', mileStone);