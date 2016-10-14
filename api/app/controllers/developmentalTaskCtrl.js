/**
 * Created by rajanchaudhary on 10/11/16.
 */

var DT = require('mongoose').model('developmentalTask');

exports.post = function (req, res) {
    var dt = new DT(req.body);
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

