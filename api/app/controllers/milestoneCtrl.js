/**
 * Created by rajanchaudhary on 10/11/16.
 */

var MS = require('mongoose').model('mileStone');


exports.post = function(req, res){
    var ms = new MS(req.body);
    ms.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(dt)
        }
    })
}


exports.get = function(req, res){
    MS.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}
