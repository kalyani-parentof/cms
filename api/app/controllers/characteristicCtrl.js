/**
 * Created by rajanchaudhary on 10/14/16.
 */

var Characteristic = require('mongoose').model('characteristic');


exports.post = function(req, res){
    var characteristic = new Characteristic(req.body);
    characteristic.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(characteristic)
        }
    })
}
exports.update = function(req, res){
    var char = new Characteristic(req.body);
    Characteristic.findOne({_id: char._id}, function(err, characteristic){
        characteristic.name = char.name
        characteristic.category = char.category
        characteristic.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(characteristic)
            }
        })
    })

}


exports.get = function(req, res){
    Characteristic.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.getByCategory = function(req, res){
    Characteristic.find({category: req.params.category}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}
