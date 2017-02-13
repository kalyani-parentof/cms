/**
 * Created by rajanchaudhary on 10/14/16.
 */

var DP = require('mongoose').model('dp');
var Skill = require('mongoose').model('skill');
var Age = require('mongoose').model('ageGroup');
var Question = require('mongoose').model('question');


exports.post = function (req, res) {
    var dp = new DP(req.body);
    dp.save(function (err) {
        if (err) {
            res.error(err)
        }
        else {
            res.success(dp)
        }
    })
}


exports.get = function (req, res) {
    DP.find({}, {name: 1, _id: 1, age: 1}, function (err, data) {
        if (err) {
            res.error(err)
        }
        else {
            res.success(data)
        }
    })
}


exports.addIndicator = function (req, res) {
    var id = req.params.id;
    var indicator = req.body.indicator;
    console.log("indicator", id, indicator)
    DP.update({_id: id}, {$push: {indicators: indicator}}, function (err) {

        res.success("saved successfully")
    })
}

exports.removeIndicator = function (req, res) {
    var id = req.params.id;
    var indicator = req.params.indicator;
    DP.update({_id: id}, {$pull: {indicators: indicator}}, function (err) {
        res.success("saved successfully")
    })
}

exports.getById = function (req, res) {
    var id = req.params.id;
    DP.findOne({_id: id}, {_id: 1, indicators: 1}).populate('indicators').exec(function (err, data) {
        if (err) {
            res.error(err)
        }
        else {
            res.success(data)
        }
    })
}

exports.getByDA = function (req, res) {
    var da = req.params.da;
    var age = req.params.age;
    DP.find({da: da, age: age}, {_id: 1, name: 1}).exec(function (err, data) {
        if (err) {
            res.error(err)
        }
        else {
            res.success(data)
        }
    })
}


exports.getDpsByAge = function (req, res) {
    var age = req.params.age;
    Age.find({name: new RegExp('^' + age)}, function (err, data) {
        if (err) {
            res.error(err);
            return;
        }
        if (Array.isArray(data)) {
            if(data.length == 0)
            {
                res.success([])
                return;
            }
            var ageGroup = data[0]._id
            DP.find({age: ageGroup}, {_id: 1, name:1, image:1, createdDate: 1})
                .exec(function (err, data) {
                    if (err) {
                        res.error(err)
                    }
                    else {
                        res.success(data)
                    }
                })
        }
    })
}


exports.getSkillsByDp = function(req, res){
    Skill.find({decisionPoint: req.param.dp},{rank: 1, name: 1,_id: 1}, function(err, dps){
        res.success(dps)
    })
}

exports.getQuestionFromSkills = function(req, res){
    Skill.findOne({_id: req.param.sa}, function(err, dp ){
        var indicators = dp.indicators
        Question.find({indicator: {$in: indicators}}, {question: 1, _id: 1}, function(questions){
            res.success({rank: dp.rank, questions: questions})
        })
    })
}
