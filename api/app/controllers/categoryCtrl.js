/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Category = require('mongoose').model('category');


exports.post = function(req, res){
    var category = new Category(req.body);
    category.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(category)
        }
    })
}


exports.get = function(req, res){
    Category.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var categoryReq = req.body;
    Category.findOne({_id: categoryReq._id}, function(err, category){
        category.name = categoryReq.name
        category.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(category)
            }
        })
    })
}