/**
 * Created by rajanchaudhary on 10/11/16.
 */

var DT = require('mongoose').model('developmentalTask');
var MS = require('mongoose').model('mileStone');
var Indicator = require('mongoose').model('indicator');

exports.post = function (req, res) {
    var dt = new DT(req.body);
    console.log(dt)
    dt.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(dt)
        }
    })
}


exports.get = function(req, res){
    DT.find({}, function(err, data){
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}

//Milestone
function findByName(arr, name){
    for(var i=0; i< arr.length; i++){
        if(arr[i].name == name){
            return arr[i]
        }
    }
}

exports.addMS = function (req, res) {
    var dtId = req.params.dt;
    var body = req.body;
    var arr = []
    var indicators = []
    for(var i=0; i< body.indicators.length; i++){
        indicators.push(new Indicator({name: body.indicators[i].indicator}))
    }
    Indicator.insertMany(indicators,function(err, data){
        console.log(data)
        for(var i=0; i< body.indicators.length; i++){
            arr.push({trait: body.indicators[i]._id, indicator: findByName(data,body.indicators.indicator)._id})
        }
        console.log(arr)
        var ms = new MS({name: body.name, description: body.description, indicators: arr});
        ms.save(function(err){
            if(err){
                res.error(err)
            }else{
                DT.update({_id: dtId},{$push:{mileStones: ms._id}}, function(errr){
                    res.success("saved successfully")
                })
            }
        })
    })

}

exports.getMS = function (req, res) {
    var dtId = req.params.dt;
    DT.findOne({_id: dtId}, {_id:1, mileStones:1}).populate('mileStones').exec(function (err, data) {
        if(err){
            res.error(err)
        }
        else{
            res.success(data)
        }
    })
}



//
