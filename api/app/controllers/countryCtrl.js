/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Country = require('mongoose').model('country');


exports.post = function(req, res){
    var country = new Country(req.body);
    country.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(country)
        }
    })
}


exports.get = function(req, res){
    Country.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var countryReq = req.body
    Country.findOne({_id: countryReq._id}, function(err, country){
        country.name = countryReq.name
        country.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(country)
            }
        })
    })
}