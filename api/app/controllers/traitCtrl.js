/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Trait = require('mongoose').model('trait');


exports.post = function(req, res){
    var trait = new Trait(req.body);
    trait.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(trait)
        }
    })
}


exports.get = function(req, res){
    Trait.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var traitReq = new Trait(req.body);
    Trait.findOne({_id: traitReq._id}, function(err, trait){
        trait.name = traitReq.name
        trait.description = traitReq.description
        trait.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(trait)
            }
        })
    })
}