/**
 * Created by rajanchaudhary on 10/10/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var contentTierCategory = new Schema({
    "name" : {type: String},
    "category" : {type: String},
    "hasIndicators" : Boolean,
    "level" : {type: Number},
    "subsequentLevel" : {type: Number},
    "user" : {type: String},
    createdDate: {
        type: Date,
        default: Date.now
    }
},{ collection: 'contentTierCategories' });

mongoose.model('contentTierCategory', contentTierCategory);