/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Gender = require('mongoose').model('gender');


exports.post = function(req, res){
    var gender = new Gender(req.body);
    gender.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(gender)
        }
    })
}


exports.get = function(req, res){
    Gender.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var genderReq = req.body
    Gender.findOne({_id: genderReq._id}, function(err, gender){
        gender.name = genderReq.name
        gender.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(gender)
            }
        })
    })
}