/**
 * Created by rajanchaudhary on 10/14/16.
 */

var DP = require('mongoose').model('dp');


exports.post = function(req, res){
    var dp = new DP(req.body);
    dp.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(dp)
        }
    })
}


exports.get = function(req, res){
    DP.find({},{name:1,_id:1, age:1}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.addIndicator = function(req, res){
    var id = req.params.id;
    var indicator = req.body.indicator;
    console.log("indicator",id, indicator)
    DP.update({_id: id},{$push:{indicators: indicator}}, function(err){

        res.success("saved successfully")
    })
}

exports.removeIndicator = function(req, res){
    var id = req.params.id;
    var indicator = req.params.indicator;
    DP.update({_id: id},{$pull:{indicators: indicator}}, function(err){
        res.success("saved successfully")
    })
}

exports.getById = function(req, res){
    var id = req.params.id;
    DP.findOne({_id: id}, {_id:1, indicators:1}).populate('indicators').exec(function (err, data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}