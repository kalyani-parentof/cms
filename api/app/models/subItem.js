
/**
 * Created by rajanchaudhary on 10/11/16.
 */
var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var subItem = new Schema({
    name: {type: String,unique : true,required: true},
    characteristics: [{
        characteristic: {
            type: String,
            ref: 'characteristic'
        },
        category: {
            type: String,
            ref: 'category'
        }
    }],
    functionality: {
        type: String,
        ref: 'functionality'
    },
    country: {
        type:String,
        ref : 'country'
    },
    ses: {
        type:String,
        ref : 'ses'
    },
    gender: {
        type:String,
        ref : 'gender'
    },
    tier: {
        type:String,
        ref : 'tier'
    },
    das: [{
        type:String,
        ref : 'developmentalArea'
    }],
    createdBy: String,
    isDeleted: Boolean,
    isApproved: Boolean,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
subItem.plugin(uniqueValidator);
mongoose.model('subItem', subItem);