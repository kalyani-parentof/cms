/**
 * Created by rajanchaudhary on 10/11/16.
 */
var Indicator = require('mongoose').model('indicator');


exports.post = function (req, res) {
    var indicator = new Indicator(req.body);
    indicator.save(function (err) {
        if (err) {
            res.error(err)
        }
        else {
            res.success(indicator)
        }
    })
}


exports.get = function (req, res) {
    Indicator.find({}, function (err, data) {
        if (err) {
            res.error(err)
        }
        else {
            res.success(data)
        }
    })
}

exports.update = function (req, res) {
    Indicator.update({_id: req.body.id}, {name: req.body.name, isPermanent: req.body.isPermanent}, function (err) {

        res.success("updated successfully")
    })
}

exports.deleteDpDaMap = function (req, res) {
    Indicator.update({_id: req.body.id}, {
        $pull: {dps:{ dp: req.body.dp, da: req.body.da}}
    }, function (err) {
        if (err) {
            res.error(err);
            return;
        } else
            res.success(
                "Da Dp deleted"
            );
    })
}