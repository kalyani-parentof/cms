var RP = require('mongoose').model('researchProof');


exports.post = function(req, res){
    var proof = new RP(req.body)
    proof.save(function(err){
        if(err){
            res.error(err)
        }
        else{
            res.success(proof)
        }
    })
}