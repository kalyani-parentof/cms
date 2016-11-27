var config = require('./config'),
    mongoose = require('mongoose');
module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../app/models/ageGroup')
    require('../app/models/developmentalTask')
    require('../app/models/mileStone')
    require('../app/models/trait')
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

    return db;
};
