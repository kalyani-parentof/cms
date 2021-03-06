var config = require('./config'),
    mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../app/models/ageGroup')
    require('../app/models/developmentalTask')
    require('../app/models/mileStone')
    require('../app/models/trait')
    require('../app/models/taxonomyCategory')
    require('../app/models/characteristic')
    require('../app/models/developmentalArea')
    require('../app/models/dp')
    require('../app/models/functionality')
    require('../app/models/indicator')
    require('../app/models/objective')
    require('../app/models/tag')
    require('../app/models/country')
    require('../app/models/tier')
    require('../app/models/ses')
    require('../app/models/gender')
    require('../app/models/subItem')
    require('../app/models/question')
    require('../app/models/researchProof')
    require('../app/models/category')
    require('../app/models/skill')
    require('../app/models/contentTierCategory')
    require('../app/models/intervention')
    require('../app/models/milestoneN')

    return db;
};


mongoose.set('debug', true);