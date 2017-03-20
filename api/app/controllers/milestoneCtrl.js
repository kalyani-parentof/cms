/**
 * Created by rajanchaudhary on 10/11/16.
 */

var MS = require('mongoose').model('mileStone');
var OBJECTIVE = require('mongoose').model('objective');
var Question = require('mongoose').model('question');
var Indicator = require('mongoose').model('indicator');
var DP = require('mongoose').model('dp');
var async = require('async')

exports.addDp = function (req, res) {
    var msId = req.params.ms;
     var dpReq = req.body;
    if (dpReq.DP) {
        var dp = new DP({name: dpReq.DP, da: dpReq.da, age: dpReq.age});
        dp.save(function (err) {
            if (err) {
                res.error(err)
            }
            else {
                dpReq.dp = dp._id

                Indicator.update({_id: dpReq.indicator}, {$push: {dps: {da: dpReq.da, dp: dpReq.dp}}}, function (err) {
                    if (err) {
                        res.error(err)
                    }
                    else {
                        res.success("added dp to indicator")
                    }

                })
            }
        })
    }
    else {
        Indicator.update({_id: dpReq.indicator}, {$push: {dps: dpReq}}, function (err) {
            if (err) {
                res.error(err)
            }
            else {
                res.success("added dp to indicator")
            }
        })
    }
}

exports.addIndicator = function (req, res) {
    var msId = req.params.ms;
    var indicator = req.body;
    if (indicator.DP) {
        var dp = new DP({name: indicator.DP, da: indicator.da, age: indicator.age});
        dp.save(function (err) {
            if (err) {
                res.error(err)
            }
            else {
                indicator.dp = dp._id
                insertIndicator(msId, indicator, res)
            }
        })
    }
    else {
        insertIndicator(msId, indicator, res)
    }
}

function insertIndicator(msId, indi, res) {
    var indicator = new Indicator({name: indi.indicator, isPermanent: indi.isPermanent});
    indicator.save(function (err) {
        if (err) {
            res.error(err)
        }
        else {
            indi.indicator = indicator._id
            MS.update({_id: msId}, {$push: {indicators: indi}}, function (errr) {
                res.success("saved successfully")
            })
        }
    })

}

exports.listIndicators = function (req, res) {
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
        }, {"indicators.$": 1}, function (err, indicators) {
            if (err) {
                res.error(err)
            }
            else {
                res.success({data: data, indicator: indicators})
            }
        })
    })
}

exports.update = function (req, res) {
    MS.findOne({_id: req.body._id}, function (err, ms) {
        ms.name = req.body.name
        ms.save(function (err) {
            if (err) {
                res.error(err)
            }
            else {
                res.success(ms)
            }
        })
    })
}

exports.findIndicators = function (req, res) {
    var msId = req.params.ms;
    console.log(msId)
    MS.find({_id: msId}).populate({
        path: 'indicators.trait',
        populate: {
            path: 'trait',
            model: 'trait'
        }
    }).populate({
        path: 'indicators.indicator',
        populate: {
            path: 'dps.da',
            populate: {
                path: 'da',
                model: 'developmentalArea'
            }
        }

    }).populate({
        path: 'indicators.indicator',
        populate: {
            path: 'dps.dp',
            populate: {
                path: 'dp',
                model: 'dp'
            }
        }

    }).populate(
        {
            path: 'objectives',
            populate: {
                path: 'objective',
                populate: {
                    path: 'questions',
                    populate: {path: 'trait', model: 'trait'}

                }
            }
        }
    )
        .exec(function (err, data) {
            console.log(err, data)
            if (err) {
                res.error(err)
            }
            else {
                res.success(data)
            }
        })
}


exports.getIndicator = function (req, res) {
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
        if (err) {
            res.error(err)
        }
        else {
            res.success(data)
        }
    })
}

exports.deleteIndicator = function (req, res) {
    var msId = req.params.ms;
    var trait = req.params.trait;
    var indicator = req.params.indicator;
    var da = req.params.da;
    var dp = req.params.dp;
    var msId = req.params.ms;
    var indicator = req.body;
    MS.update({_id: msId}, {
        $pull: {
            indicators: {
                trait: trait,
                indicator: indicator,
                da: da,
                dp: dp
            }
        }
    }, function (errr) {
        res.success("deleted successfully")
    })
}

//Objective

exports.addObjective = function (req, res) {
    var msId = req.params.ms;
    var body = req.body;
    var questions = []
    console.log(body.questions)
    for (var i = 0; i < body.questions.length; i++) {
        questions.push(new Question(body.questions[i]));
    }
    req.body.questions = []
    var obj = new OBJECTIVE(req.body);
    console.log(questions)
    Question.insertMany(questions, function (err, data) {
        if (err) {
            console.log(err)
        }
        for (var i = 0; i < data.length; i++) {
            obj.questions.push(questions[i]._id)
        }
        obj.save(function (err) {
            if (err) {
                res.error(err)
            } else {
                MS.update({_id: msId}, {$push: {objectives: obj._id}}, function (errr) {
                    res.success("saved successfully")
                })
            }
        })
    })


}

exports.updateObjective = function (req, res) {
    var bulk = Question.collection.initializeOrderedBulkOp();
    var body = req.body
    var updateHash = {}
    var counter = 0
    function inc(){
        counter++;
    }

    function dec (){
        counter--;
        if(counter == 0){
            res.success("updated")
        }
    }
    var questionsToUpdate = []
    OBJECTIVE.findOne({_id: body.id}, function (err, obj) {
        if (err) {
            console.log(err)
        }
        var questions = []
        for (var i = 0; i < body.questions.length; i++) {
            if (!body.questions[i].questionId) {
                questions.push(new Question(body.questions[i]));
            }
            else {
                questionsToUpdate.push({_id: body.questions[i].questionId,question: body.questions[i].question })

            }
        }
        if (questions.length > 0) {
            Question.insertMany(questions, function (err, data) {
                if (err) {
                    console.log(err)
                }

                for (var i = 0; i < data.length; i++) {
                    obj.questions.push(questions[i]._id)
                }
                update()

            })

        }
        else {
            update()
        }
        function update(){
            for(var i =0;i< questionsToUpdate.length; i++){
                inc()
                Question.update({_id: questionsToUpdate[i]._id}, {$set: {question: questionsToUpdate[i].question}}, function(){
                    dec()
                })
            }
        }
    })



}