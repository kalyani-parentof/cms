/**
 * Created by rajanchaudhary on 10/14/16.
 */

var DP = require('mongoose').model('dp');
var Skill = require('mongoose').model('skill');
var Age = require('mongoose').model('ageGroup');
var Intervention = require('mongoose').model('intervention');
var CTC = require('mongoose').model('contentTierCategory');
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
            if (data.length == 0) {
                res.success([])
                return;
            }
            var ageGroup = data[0]._id
            Skill.find({}, {decisionPoint: 1, name: 1, _id: 1}).populate({
                path: 'decisionPoint',
                model: 'dp'
            }).exec(function (err, data) {
                res.success(data)
            })

        }
    })
}

function getDPWithSkillCount(skills) {
    var dpHash = {};
    for (var i = 0; i < skills.length; i++) {
        if (!dpHash[skills[i].decisionPoint._id]) {
            dpHash[skills[i].decisionPoint._id] =
            {
                id: skills[i].decisionPoint._id,
                name: skills[i].decisionPoint.name,
                skill: 1
            }
        }

    }
}

exports.interventionBySkill = function (req, res) {
    var sa = req.params.sa;
    Intervention.find({skill: sa}).populate({
        path: 'ctType',
        model: 'contentTierCategory'
    }).exec(function (err, interventions) {
        res.success(interventions)
    })
}

exports.interventionById = function (req, res) {
    var id = req.params.id;
    Intervention.findOne({_id: id}).populate({
        path: 'ctType',
        model: 'contentTierCategory'
    }).exec(function (err, interventions) {
        res.success(interventions)
    })
}

exports.getSkillsByDp = function (req, res) {
    Skill.find({decisionPoint: req.params.dp}, {
        rank: 1,
        name: 1,
        description: 1,
        _id: 1,
        indicators: 1,
        isLocked: 1,
        thumb: 1,
        cover: 1
    }, {sort: 'rank'}, function (err, dps) {
        res.success(dps)
    })
}

exports.getSkillsByIds = function(req, res){
    var ids = req.query.ids.split(',')
    console.log(ids)
    Skill.find({_id : {$in : ids}}, {name: 1,cover:1}, function(err, data){
        res.success(data)
    })
}

exports.ActivateSkillsByDp = function (req, res) {
    Skill.find({decisionPoint: req.params.dp}, {
        rank: 1,
        name: 1,
        _id: 1,
        indicators: 1
    }, {sort: 'rank'}, function (err, dps) {
        Question.find({indicator: {$in: dps[0].indicators}}, function (err, questions) {

            res.success({dps: dps, questions: questions})
        })
    })
}
exports.getQuestionFromSkills = function (req, res) {
    Skill.findOne({_id: req.params.sa}, function (err, dp) {
        console.log(dp)
        var indicators = dp.indicators
        console.log(indicators)
        Question.find({indicator: {$in: indicators}}, {question: 1, _id: 1, indicator: 1}, function (err, questions) {
            console.log(questions)
            res.success({rank: dp.rank, questions: questions})
        })
    })
}




