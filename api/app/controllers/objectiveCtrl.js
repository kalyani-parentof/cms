var OBJECTIVE = require('mongoose').model('objective');

exports.searchItem = function(req, res){
    var body = req.body;
    OBJECTIVE.find({subItem1: body.subItem1, subItem2: body.subItem2}, function(err, data){
        console.log(data)
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}