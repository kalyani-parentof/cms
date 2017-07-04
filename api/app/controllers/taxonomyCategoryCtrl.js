
var TaxonomyCategory = require('mongoose').model('taxonomyCategory');


exports.post = function(req, res){
    var taxonomyCategory = new TaxonomyCategory(req.body);
    taxonomyCategory.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(taxonomyCategory)
        }
    })
}


exports.get = function(req, res){
    TaxonomyCategory.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var taxonomyCategoryReq = new TaxonomyCategory(req.body);
    TaxonomyCategory.findOne({_id: taxonomyCategoryReq._id}, function(err, taxonomyCategory){
        taxonomyCategory.name = taxonomyCategoryReq.name
        taxonomyCategory.description = taxonomyCategoryReq.description
        taxonomyCategory.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(taxonomyCategory)
            }
        })
    })
}

exports.delete = function(req,res){
    var id = req.params.id;
    console.log(id);
    TaxonomyCategory.remove({_id: id},function (err,data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    });
    res.success("deleted successfully")
}
