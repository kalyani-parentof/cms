/**
 * Created by rajanchaudhary on 10/11/16.
 */
var SubItem = require('mongoose').model('subItem');


exports.post = function(req, res){
    var subItem = new SubItem(req.body);
    subItem.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(subItem)
        }
    })
}

exports.get = function(req, res){
    SubItem.find({},function(err,data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}

exports.search = function(req, res){
    var searchReq = req.body;

    var query = {}
    if(searchReq.functionality){
        query.functionality = searchReq.functionality;
    }

    if(searchReq.characteristic){
        query.characteristic = searchReq.characteristic
    }

    if(searchReq.country){
        query.country = searchReq.country
    }
    if(searchReq.ses){
        query.ses = searchReq.ses
    }
    if(searchReq.tier){
        query.tier = searchReq.tier
    }
    if(searchReq.gender){
        query.gender = searchReq.gender
    }

    SubItem.find(query, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })

}
