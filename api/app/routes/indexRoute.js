module.exports = function (app) {
    var health = require('../controllers/health');
    var age = require('../controllers/ageGroupCtrl');
    var trait = require('../controllers/traitCtrl');
    var category = require('../controllers/categoryCtrl');
    var country = require('../controllers/countryCtrl');
    var taxonomyCategory = require('../controllers/taxonomyCategoryCtrl');
    var tier = require('../controllers/tierCtrl');
    var gender = require('../controllers/genderCtrl');
    var subItem = require('../controllers/subItemCtrl');
    var objective = require('../controllers/objectiveCtrl');
    var ses = require('../controllers/sesCtrl');
    var indicator = require('../controllers/indicatorCtrl');
    var da = require('../controllers/developmentalAreaCtrl');
    var characteristic = require('../controllers/characteristicCtrl');
    var functionality = require('../controllers/functionalityCtrl');
    var dp = require('../controllers/dpCtrl');
    var dt = require('../controllers/developmentalTaskCtrl');
    var ms = require('../controllers/milestoneCtrl');
    var fileCtrl = require('../controllers/fileCtrl');
    var rp = require('../controllers/researchProofCtrl');
    var milestone = require('../controllers/milestoneNCtrl');

    app.get('/*', function (req, res, next) {
        res.header('X-XSS-Protection', 0);
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    });

    app.get('/health',health.getHealth)

    //da
    app.post('/da', da.post);
    app.put('/da', da.update);
    app.get('/da/', da.getAll);
    app.delete('/da/:id', da.delete);

    //characteristic
    app.post('/characteristic', characteristic.post);
    app.put('/characteristic', characteristic.update);
    app.get('/characteristic', characteristic.get);
    app.get('/characteristic/:category', characteristic.getByCategory);

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
    app.put('/subItem', subItem.update)
    app.post('/subItem/search', subItem.search)
    app.post('/si/:id', subItem.delete)



    app.post('/trait', trait.post)
    app.put('/trait', trait.update)
    app.get('/trait', trait.get)
    app.delete('/trait/:id', trait.delete)

    app.post('/taxonomyCategory', taxonomyCategory.post)
    app.put('/taxonomyCategory', taxonomyCategory.update)
    app.get('/taxonomyCategory', taxonomyCategory.get)
    app.delete('/taxonomyCategory/:id', taxonomyCategory.delete)


    app.post('/category', category.post)
    app.put('/category', category.update)
    app.get('/category', category.get)
    app.delete('/category/:id', category.delete)

    app.post('/country', country.post)
    app.put('/country', country.update)
    app.get('/country', country.get)
    app.delete('/country/:id', country.delete)

    app.post('/gender', gender.post)
    app.put('/gender', gender.update)
    app.get('/gender', gender.get)
    app.delete('/gender/:id', gender.delete)

    app.post('/tier', tier.post)
    app.put('/tier', tier.update)
    app.get('/tier', tier.get)
    app.delete('/tier/:id', tier.delete)

    app.post('/ses', ses.post)
    app.put('/ses', ses.update)
    app.get('/ses', ses.get)
    app.delete('/ses/:id', ses.delete)
    //DP
    app.post('/dp', dp.post);
    app.get('/dp', dp.get);
    app.get('/dp/skillsByIds', dp.getSkillsByIds);
    app.get('/dp/age/:age', dp.getDpsByAge);
    app.get('/dp/intervention/:dp', dp.getInterventionsByDp);
    app.get('/dp/questions/:dp', dp.getInterventionsByDp);
    app.get('/dp/da/:da/age/:age', dp.getByDA);
    app.post('/dp/indicator/:id', dp.addIndicator);
    app.delete('/dp/indicator/:id/:indicator', dp.removeIndicator);
    app.get('/dp/:id', dp.getById);
    app.get('/dp/skills/:dp', dp.getSkillsByDp);
    app.get('/dp/skills/:sa/interventions', dp.interventionBySkill);
    app.get('/dp/skills/questions/:sa', dp.getQuestionFromSkills);
    app.get('/dp/skills/intervention/:id', dp.interventionById);





    //dt
    app.post('/dt', dt.post);
    app.put('/dt', dt.update);
    app.get('/dt/age/:age/', dt.getByAge);
    app.post('/dt/:dt/milestone/', dt.addMS);
    app.get('/dt/:dt/milestone/', dt.getMS);
    app.get('/dt', dt.get);


    //Indicator
    app.post('/indicator', indicator.post)
    app.put('/indicator', indicator.update)
    app.get('/indicator', indicator.get)
    app.put('/indicator/delete', indicator.deleteDpDaMap)
    app.delete('/indicator/:id', indicator.delete)

    // Milestones
    app.post('/indicator/dp', ms.addDp)
    app.put('/ms', ms.update)
    app.get('/ms/indicator/:ms', ms.findIndicators)
    app.post('/objective/searchItem', objective.searchItem)
    app.get('/objective/:id', objective.getItem)
    app.post('/ms/:ms', ms.addIndicator)
    app.post('/objective/:ms', ms.addObjective)
    app.put('/objective/:ms', ms.updateObjective)
    app.get('/ms/:ms', ms.getIndicator)
    app.delete('/ms/:ms/:taxonomyCategory/:trait/:indicator/:da/:dp', ms.deleteIndicator)
    app.get('/ms/:ms/:taxonomyCategory/:trait/', ms.listIndicators)

    app.post('/fileUpload/research', fileCtrl.create)

    app.get('/milestone', milestone.get);
    app.post('/milestone', milestone.post);
    app.put('/milestone', milestone.update);
    //app.delete('/milestone/id',milestone.delete)
    app.delete('/milestone/:id/', milestone.deleteMilestone);

   // app.delete('/milestone/:id', milestone.delete);


    app.post('/research', rp.post)

};