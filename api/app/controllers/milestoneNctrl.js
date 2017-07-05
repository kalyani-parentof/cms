/**
 * Created by parentof 6 on 20-06-2017.
 */
var Milestone = require('mongoose').model('milestone');


exports.post = function(req, res){
    var milestone = new Milestone(req.body);
    milestone.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(milestone)
        }
    })
}


exports.get = function(req, res){
    Milestone.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}


exports.update = function(req, res){
    var milestoneReq = req.body;
    Milestone.findOne({_id: milestoneReq._id}, function(err, milestone){
        milestone.name = milestoneReq.name;
        milestone.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(milestone)
            }
        })
    })
}
exports.getAll = function(req, res){
    Milestone.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}

exports.deleteMilestone= function(req, res){

    var id = req.params.id;
    console.log(id);

    Milestone.remove({_id: id}, function(err,data){

        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }

    })



    res.success("deleted successfully")
}
