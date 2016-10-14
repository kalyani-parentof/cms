/**
 * Created by rajanchaudhary on 10/14/16.
 */

var Functionality = require('mongoose').model('functionality');


exports.post = function(req, res){
    var functionality = new Functionality(req.body);
    functionality.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(functionality)
        }
    })
}


exports.get = function(req, res){
    Functionality.find({},{name:1,_id:1, code:1}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.addChar = function(req, res){
    var id = req.param.id;
    var char = req.body.char;

    Functionality.update({_id: id},{$push:{characteristic: char}}, function(){
        res.success("saved successfully")
    })
}

exports.removeChar = function(req, res){
    var id = req.param.id;
    var char = req.body.char;

    Functionality.update({_id: id},{$pull:{characteristic: char}})
}

exports.getById = function(req, res){
    var id = req.param.id;
    Functionality.findOne({_id: id}, {_id:1, characteristic:1}, function (err, data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}