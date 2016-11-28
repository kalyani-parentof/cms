exports.create = function (req, res, next) {

    res.success(req.files.file.name)
};