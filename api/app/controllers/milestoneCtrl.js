/**
 * Created by rajanchaudhary on 10/11/16.
 */

var MS = require('mongoose').model('mileStone');
var OBJECTIVE = require('mongoose').model('objective');
var Question = require('mongoose').model('question');


exports.addIndicator = function(req, res){
    var msId = req.params.ms;
    var indicator = req.body;
            MS.update({_id: msId},{$push:{indicators:indicator}}, function(errr){
                res.success("saved successfully")
            })
}

exports.listIndicators = function(req, res){
    var msId = req.params.ms;
    var trait = req.params.trait;

    MS.findOne({_id: msId}).populate({
        path: 'indicators.indicator',
        populate: {
            path: 'indicator',
            model: 'indicator'
        }
    }).exec(function (err, data) {
        MS.find({
            "indicators": {
            $elemMatch: {
                "trait": trait
            }
        }
        },{"indicators.$": 1}, function(err, indicators){
            if(err){
                res.error(err)
            }
            else{
                res.success({data: data, indicator:indicators})
            }
        })
    })
}

exports.update = function(req, res){
    MS.findOne({_id: req.body._id}, function(err, ms){
        ms.name = req.body.name
        ms.save(function(err){
            if(err){
                res.error(err)
            }
            else{
                res.success(ms)
            }
        })
    })
}

exports.getIndicator = function(req, res){
    var msId = req.params.ms;
    MS.findOne({_id: msId}).populate({
        path: 'indicators.indicator',
        populate: {
            path: 'indicator',
            model: 'indicator'
        }
    }).populate({
        path: 'indicators.trait',
        populate: {
            path: 'trait',
            model: 'trait'
        }
    }).populate({
        path: 'objectives',
        populate: {
            path: 'subItem1',
            select: 'name _id'

        }
    }).populate({
        path: 'objectives',
        populate: {
            path: 'subItem2',
            select: 'name _id'

        }
    }).exec(function (err, data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}

exports.deleteIndicator = function(req, res){
    var msId = req.params.ms;
    var trait = req.params.trait;
    var indicator = req.params.indicator;
    var msId = req.params.ms;
    var indicator = req.body;
    MS.update({_id: msId},{$pull:{indicators:{trait: trait,indicator: indicator }}}, function(errr){
        res.success("deleted successfully")
    })
}

//Objective

exports.addObjective = function (req, res) {
    var msId = req.params.ms;
    var body = req.body;
    var questions = []

    for(var i=0; i< body.questions.length; i++){
        questions.push(new Question(body.questions[i]));
    }
    req.body.questions = []
    var obj = new OBJECTIVE(req.body);
    console.log(questions)
    Question.insertMany(questions,function(err,data){

        for(var i=0; i< data.length; i++) {
            obj.questions.push(data[i]._id)
        }
        obj.save(function(err){
            if(err){
                res.error(err)
            }else{
                MS.update({_id: msId},{$push:{objectives: obj._id}}, function(errr){
                    res.success("saved successfully")
                })
            }
        })
    })


}