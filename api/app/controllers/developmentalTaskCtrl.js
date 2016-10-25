/**
 * Created by rajanchaudhary on 10/11/16.
 */

var DT = require('mongoose').model('developmentalTask');
var MS = require('mongoose').model('mileStone');

exports.post = function (req, res) {
    var dt = new DT(req.body);
    console.log(dt)
    dt.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(dt)
        }
    })
}


exports.get = function(req, res){
    DT.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}

//Milestone

exports.addMS = function (req, res) {
    var dtId = req.params.dt;
    var ms = new MS(req.body);
    ms.save(function(err){
        if(err){
            res.error(err)
        }else{
            DT.update({_id: dtId},{$push:{mileStones: ms._id}}, function(errr){
                 res.success("saved successfully")
            })
        }
    })
}

exports.getMS = function (req, res) {
    var dtId = req.params.dt;
    DT.findOne({_id: dtId}, {_id:1, mileStones:1}).populate('mileStones').exec(function (err, data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}



//
