/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Tier = require('mongoose').model('tier');


exports.post = function(req, res){
    var tier = new Tier(req.body);
    tier.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(tier)
        }
    })
}


exports.get = function(req, res){
    Tier.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var tierReq = req.body
    Tier.findOne({_id: tierReq._id}, function(err, tier){
        tier.name = tierReq.name
        tier.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(tier)
            }
        })
    })
}