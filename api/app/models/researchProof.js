var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var researchProof = new Schema({
    name: {type: String,unique : true,required: true},
    description: String,
    type: String,
    age: {type:String,ref: 'ageGroup'},
    link: String,
    nameOfDocument: String,
    pageNo: String,
    author: String,
    isbn: String,
    excerpt: String,
    fileLink: String,
    interpretation: String,
    conclusion: String,
    createdBy: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
researchProof.plugin(uniqueValidator);
mongoose.model('researchProof', researchProof);