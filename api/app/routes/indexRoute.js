module.exports = function (app) {
    var health = require('../controllers/health');
    var da = require('../controllers/developmentalAreaCtrl');
    var characteristic = require('../controllers/characteristicCtrl');
    var functionality = require('../controllers/functionalityCtrl');
    app.get('/*', function (req, res, next) {
        res.header('X-XSS-Protection', 0);
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/health',health.getHealth)

    //da
    app.post('/da', da.post);
    app.get('/da', da.get);

    //characteristic
    app.post('/characteristic', characteristic.post);
    app.get('/characteristic', characteristic.get);

    //characteristic
    app.post('/functionality', functionality.post);
    app.get('/functionality', functionality.get);
    app.post('/functionality/char/:id', functionality.addChar);
    app.delete('/functionality/char/:id/:char', functionality.removeChar);
    app.get('/functionality/:id', functionality.getById);


};