module.exports = function (app) {
    var health = require('../controllers/health');
    var age = require('../controllers/ageGroupCtrl');
    var trait = require('../controllers/traitCtrl');
    var country = require('../controllers/countryCtrl');
    var tier = require('../controllers/tierCtrl');
    var gender = require('../controllers/genderCtrl');
    var subItem = require('../controllers/subItemCtrl');
    var ses = require('../controllers/sesCtrl');
    var indicator = require('../controllers/indicatorCtrl');
    var da = require('../controllers/developmentalAreaCtrl');
    var characteristic = require('../controllers/characteristicCtrl');
    var functionality = require('../controllers/functionalityCtrl');
    var dp = require('../controllers/dpCtrl');
    var dt = require('../controllers/developmentalTaskCtrl');
    var ms = require('../controllers/milestoneCtrl');

    app.get('/*', function (req, res, next) {
        res.header('X-XSS-Protection', 0);
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/health',health.getHealth)

    //da
    app.post('/da', da.post);
    app.put('/da', da.update);
    app.get('/da/:age', da.get);
    app.get('/da/', da.getAll);

    //characteristic
    app.post('/characteristic', characteristic.post);
    app.put('/characteristic', characteristic.update);
    app.get('/characteristic', characteristic.get);

    //functionality
    app.post('/functionality', functionality.post);
    app.get('/functionality', functionality.get);
    app.post('/functionality/char/:id', functionality.addChar);
    app.delete('/functionality/char/:id/:char', functionality.removeChar);
    app.get('/functionality/:id', functionality.getById);

    //age
    //da
    app.post('/age', age.post);
    app.get('/age', age.get);

    app.post('/subItem', subItem.post)
    app.post('/subItem/search', subItem.search)



    app.post('/trait', trait.post)
    app.put('/trait', trait.update)
    app.get('/trait', trait.get)

    app.post('/country', country.post)
    app.put('/country', country.update)
    app.get('/country', country.get)

    app.post('/gender', gender.post)
    app.put('/gender', gender.update)
    app.get('/gender', gender.get)

    app.post('/tier', tier.post)
    app.put('/tier', tier.update)
    app.get('/tier', tier.get)

    app.post('/ses', ses.post)
    app.put('/ses', ses.update)
    app.get('/ses', ses.get)
    //DP
    app.post('/dp', dp.post);
    app.get('/dp', dp.get);
    app.post('/dp/indicator/:id', dp.addIndicator);
    app.delete('/dp/indicator/:id/:indicator', dp.removeIndicator);
    app.get('/dp/:id', dp.getById);


    //dt
    app.post('/dt', dt.post);
    app.post('/dt/:dt/milestone/', dt.addMS);
    app.get('/dt/:dt/milestone/', dt.getMS);
    app.get('/dt', dt.get);


    //Indicator
    app.post('/indicator', indicator.post)
    app.get('/indicator', indicator.get)

    // Milestones
    app.post('/ms/:ms', ms.addIndicator)
    app.post('/objective/:ms', ms.addObjective)
    app.get('/ms/:ms', ms.getIndicator)
    app.delete('/ms/:ms/:trait/:indicator', ms.deleteIndicator)
};