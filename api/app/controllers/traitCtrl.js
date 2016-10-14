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
