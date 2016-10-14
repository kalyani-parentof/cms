/**
 * Created by rajanchaudhary on 10/10/16.
 */

var AgeGroup = require('mongoose').model('ageGroup');

exports.post = function(req, res){
var ageGroup = new AgeGroup(req.body);
    ageGroup.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(ageGroup)
        }
    })
}

exports.get = function(req, res){
    AgeGroup.find({}, function(err, ages){
        if(err){
            res.error(err)
        }
        else{
            res.success(ages)
        }
    })
}