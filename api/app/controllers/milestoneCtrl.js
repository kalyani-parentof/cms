/**
 * Created by rajanchaudhary on 10/11/16.
 */

var MS = require('mongoose').model('mileStone');
var OBJECTIVE = require('mongoose').model('objective');


exports.addIndicator = function(req, res){
    var msId = req.params.ms;
    var indicator = req.body;
            MS.update({_id: msId},{$push:{indicators:indicator}}, function(errr){
                res.success("saved successfully")
            })
}


exports.getIndicator = function(req, res){
    var msId = req.params.ms;
    MS.findOne({_id: msId}, {_id:1, indicators:1, objectives:1}).populate(['indicators.indicator', 'indicators.trait', 'objectives']).exec(function (err, data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}

exports.deleteIndicator = function(req, res){
    var msId = req.params.ms;
    var trait = req.params.trait;
    var indicator = req.params.indicator;
    var msId = req.params.ms;
    var indicator = req.body;
    MS.update({_id: msId},{$pull:{indicators:{trait: trait,indicator: indicator }}}, function(errr){
        res.success("deleted successfully")
    })
}

//Objective

exports.addObjective = function (req, res) {
    var msId = req.params.ms;
    var obj = new OBJECTIVE(req.body);
    obj.save(function(err){
        if(err){
            res.error(err)
        }else{
            MS.update({_id: msId},{$push:{objectives: obj._id}}, function(errr){
                res.success("saved successfully")
            })
        }
    })
}