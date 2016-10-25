/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Indicator = require('mongoose').model('indicator');


exports.post = function(req, res){
    var indicator = new Indicator(req.body);
    indicator.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(indicator)
        }
    })
}


exports.get = function(req, res){
    Indicator.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}
