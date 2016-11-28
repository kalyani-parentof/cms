
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var researchProof = new Schema({
    name: String,
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

mongoose.model('researchProof', researchProof);