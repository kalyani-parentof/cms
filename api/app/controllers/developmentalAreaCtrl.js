/**
 * Created by rajanchaudhary on 10/11/16.
 */
var DA = require('mongoose').model('developmentalArea');


exports.post = function(req, res){
    var da = new DA(req.body);
    da.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(da)
        }
    })
}


exports.get = function(req, res){
    DA.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}
