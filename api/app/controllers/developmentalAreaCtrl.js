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

exports.update = function(req, res){
    var reqDa = req.body
    DA.findOne({_id: reqDa._id}, function(err, da){
        da.name = reqDa.name;
        da.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(da)
            }
        })
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

exports.getAll = function(req, res){
    DA.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}
exports.delete= function(req, res){

    var id = req.params.id;
    console.log(id);

    DA.remove({_id: id}, function(err){

        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }

    })



    res.success("deleted successfully")
}