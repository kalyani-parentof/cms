/**
 * Created by rajanchaudhary on 10/11/16.
 */
var SES = require('mongoose').model('ses');


exports.post = function(req, res){
    var ses = new SES(req.body);
    ses.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(ses)
        }
    })
}


exports.get = function(req, res){
    SES.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var sesReq = req.body
    SES.findOne({_id: sesReq._id}, function(err, ses){
        ses.name = sesReq.name
        ses.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(ses)
            }
        })
    })
};
exports.delete = function (req,res) {
    var id = req.params.id;
    SES.remove({_id:id},function (err,data) {
        if(err){
            res.error(err);
        }else{
            res.success(data);
        }

    })

}