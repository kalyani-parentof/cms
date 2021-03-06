/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('dtCtrl', function ($scope, pofRestangular,Notification) {
    function init() {
        $scope.selectedAge = ''
        pofRestangular.one('age').customGET().then(function (data) {
            $scope.ages = data.data;
        })
        $scope.selectedDt = ''
        $scope.dts = []
        //pofRestangular.one('dt').customGET().then(function(data){
        //    $scope.dts = data.data;
        //})
        $scope.dt = {name: '', description: '', age: $scope.selectedAge}
    }

    init()
    $scope.selectedAgeChange = function () {
        var age = $scope.selectedAge
        $scope.dt.age = age;
        if (age) {
            pofRestangular.one('dt').one('age').one(age).customGET().then(function (data) {
                $scope.dts = data.data ? data.data : [];
            })
        }
    }
    $scope.addDt = function () {
        pofRestangular.one('dt').customPOST($scope.dt).then(function (data) {
            if (data.status == "error") {
                $scope.errorHandler(data)
                return;
            }
            $scope.dts.push($scope.dt)
            $scope.dt = {name: '', description: '',age: $scope.selectedAge }
            $scope.selectedDt = data.data._id;
        })
        Notification.primary("Developmental task added successfully");
    }
    $scope.edit = function () {
        $scope.dt = $scope.findById($scope.dts, $scope.selectedDt);
        $scope.newDt = true;
        $scope.editMode = true;
    }
    $scope.uodateDt = function () {
        pofRestangular.one('dt').customPUT($scope.dt).then(function (data) {
            if (data.status == "error") {
                $scope.errorHandler(data)
                return;
            }
            $scope.editMode = false;
            $scope.dt = {name: '', description: ''}
        })
        Notification.primary("Developmental task updated successfully");
    }
    $scope.selectedDtChange = function () {
        initMS()
    }

    //Milestone
    function initMS() {
        $scope.addDp = false;
        $scope.selectedMS = ''
        pofRestangular.one('trait').customGET().then(function (data) {
            $scope.traits = data.data;
            for (var i = 0; i < $scope.traits.length; i++) {
                $scope.traits.indicator = ""
            }
        })
        pofRestangular.one('taxonomyCategory').customGET().then(function (data) {
            $scope.taxonomyCategories = data.data;
            for (var i = 0; i < $scope.taxonomyCategories.length; i++) {
                $scope.taxonomyCategories.indicator = ""
            }
        })

        $scope.ms = {name: '', description: '', indicators: []}
        pofRestangular.one('dt').one($scope.selectedDt).one("milestone").customGET().then(function (data) {
            $scope.milestones = data.data.mileStones;
        })
    }

    $scope.selectedDAChange = function () {
        pofRestangular.one('dp').one("da").one($scope.selectedDA).one('age').one($scope.selectedAge).customGET().then(function (data) {
            $scope.dps = data.data;
            console.log($scope.dps)
        })
    }
    pofRestangular.one('da').customGET().then(function (data) {
        $scope.das = data.data;
    })

    $scope.addMS = function () {
        pofRestangular.one('dt').one($scope.selectedDt).one("milestone").customPOST($scope.ms).then(function (data) {
            if (data.status == "error") {
                $scope.errorHandler(data)
                return;
            }
            initMS()
            alert(data.data)
        })
    }

    $scope.selectedMSChange = function () {
        $scope.selectedIndicator = ''
        $scope.selectedTrait = ''
        $scope.selectedTaxonomyCategory = ''
        if (!$scope.taxonomyCategories) {
            pofRestangular.one('taxonomyCategory').customGET().then(function (data) {
                $scope.taxonomyCategories = data.data;
            })
        }
        if (!$scope.traits) {
            pofRestangular.one('trait').customGET().then(function (data) {
                $scope.traits = data.data;
            })
        }
        if (!$scope.indicators) {

            pofRestangular.one('indicator').customGET().then(function (data) {
                $scope.indicators = data.data;
            })
        }
        pofRestangular.one('ms').one('indicator').one($scope.selectedMS).customGET().then(function (data) {
            $scope.msIndicators = data.data[0].indicators;

            $scope.objectives = data.data[0].objectives;

        })
        initObj()
    }
    $scope.activateDP = function (indicator) {
        $scope.indicatorForDP = indicator
        $scope.addDp = true
    }
    $scope.addDPs = function () {
        pofRestangular.one('indicator').one("dp").customPOST({
            da: $scope.selectedDA,
            indicator: $scope.indicatorForDP,
            dp: $scope.selectedDP,
            DP: $scope.DP,
            age: $scope.selectedAge
        }).then(function () {
            $scope.indicatorForDP = '';
            $scope.addDp = false
            $scope.selectedMSChange()

        })
    }

    $scope.addIndicator = function () {
        pofRestangular.one('ms').one($scope.selectedMS).customPOST({
            taxonomyCategory: $scope.selectedTaxonomyCategory,
            trait: $scope.selectedTrait,
            indicator: $scope.indicator,
            isPermanent: $scope.isPermanent,
            age: $scope.selectedAge
        }).then(function (data) {
            pofRestangular.one('ms').one('indicator').one($scope.selectedMS).customGET().then(function (data) {
                $scope.msIndicators = data.data[0].indicators;

                $scope.selectedTaxonomyCategory = '';
                $scope.selectedTrait = '';
                $scope.isPermanent = false;
                $scope.indicator = '';
                $scope.selectedDA = '';
                $scope.selectedDP = '';
                $scope.DP = '';
                $scope.newDp = false;
            })

        })
    }

    $scope.updateIndicator = function () {
        pofRestangular.one('indicator').customPUT({id: $scope.selectedIndicator.indicator._id, taxonomyCategoryId: $scope.selectedTaxonomyCategory, traitId: $scope.selectedTrait, name:  $scope.indicator, isPermanent: $scope.isPermanent, ms: $scope.selectedMS}).then(function(data){
            $scope.editIndicatorMode = false;
            $scope.selectedTaxonomyCategory = '';
             $scope.selectedTrait = "";
            $scope.isPermanent = "";
            $scope.indicator = "";
            $scope.selectedIndicator = {};
            $scope.selectedMSChange()
        })
    }

    $scope.deleteIndicator = function (ind) {
        pofRestangular.one('ms').one($scope.selectedMS).one(ind.taxonomyCategory._id).one(ind.trait._id).one(ind.indicator._id).one(ind.da._id).one(ind.dp._id).customDELETE().then(function (data) {
            $scope.selectedMSChange()

        })
    }

    $scope.deleteDpMapping = function(id, da, dp){
        pofRestangular.one('indicator').one('delete').customPUT({id: id, da: da, dp: dp}).then(function(data){
            $scope.selectedMSChange()
        })
    };


    $scope.editIndicator = function (indi) {
        console.log(indi);
        $scope.editIndicatorMode = true;
        $scope.selectedTaxonomyCategory = indi.taxonomyCategory._id;
        $scope.selectedTrait = indi.trait._id;
        $scope.isPermanent = indi.indicator.isPermanent;
        $scope.indicator = indi.indicator.name;
        $scope.selectedIndicator = indi;

    }
    //Objective
    function initObj() {
        $scope.code = ""
        $scope.selectedFunctionality2 = ''
        $scope.selectedFunctionality1 = ''
        $scope.selectedChar1 = ''
        $scope.selectedChar2 = ''
        $scope.objTrait = ''
        $scope.si1 = {ses: '', country: '', gender: '', tier: '', characteristic: '', functionality: ''}
        $scope.si2 = {ses: '', country: '', gender: '', tier: '', characteristic: '', functionality: ''}
        pofRestangular.one('functionality').customGET().then(function (data) {
            $scope.functionalities = data.data;
        })
        pofRestangular.one('category').customGET().then(function (data) {
            $scope.categories = data.data;
        })
        pofRestangular.one('country').customGET().then(function (data) {
            $scope.countries = data.data;
        })
        pofRestangular.one('da').customGET().then(function (data) {
            $scope.das = data.data;
        })
        pofRestangular.one('gender').customGET().then(function (data) {
            $scope.genders = data.data;
        })
        pofRestangular.one('ses').customGET().then(function (data) {
            $scope.sess = data.data;
        })
        pofRestangular.one('tier').customGET().then(function (data) {
            $scope.tiers = data.data;
        })

        $scope.obj = {
            item: '',
            derivative:'',
            question: '',
            intervention: '',
            noOfDay: '',
            noOfTime: '',
            intervention2: '',
            noOfDay2: '',
            noOfTime2: ''
        }
    }

    $scope.publishCategory1 = function () {
        pofRestangular.one('characteristic').customGET($scope.si1.category1).then(function (data) {
            $scope.characteristics1 = data.data;
        })
    }
    $scope.publishCategory2 = function () {
        pofRestangular.one('characteristic').customGET($scope.si1.category2).then(function (data) {
            $scope.characteristics2 = data.data;
        })
    }
    $scope.publishCategory3 = function () {
        pofRestangular.one('characteristic').customGET($scope.si1.category3).then(function (data) {
            $scope.characteristics3 = data.data;
        })
    }


    $scope.searchObj = {}
    $scope.searchObj.searchSi2 = false;
    $scope.refreshSi = function(){

        $scope.si1 = {ses: '', country: '', gender: '', tier: '',category1: '',category2: '',category3: '', characteristic1: '',characteristic2: '',characteristic3: '', functionality: ''}
        $scope.searchObj.searchSi2 = true;
    }
    $scope.searchSi1 = function () {
        if (!$scope.searchObj.searchSi2) {
            pofRestangular.one("subItem").one("search").customPOST($scope.si1).then(function (data) {
                    $scope.si1s = data.data
                },
                function () {
                    Notification.error("some error occurred")
                })
        }
        else if($scope.searchObj.searchSi2){
            pofRestangular.one("subItem").one("search").customPOST($scope.si2).then(function (data) {
                    $scope.si2s = data.data
                },
                function () {
                    Notification.error("some error occurred")
                })
        }

    }
    $scope.editItem = function(id){
        pofRestangular.one('objective').one(id).customGET().then(function(data){
            $scope.obj.id = id
            $scope.obj.name = data.data.name
            $scope.obj.itemName = data.data.itemName
            $scope.obj.questions = []
            $scope.editObjective = true
            for (var i = 0; i < $scope.msIndicators.length; i++) {
                var questionObj = QuestionByIndicator(data.data.questions, $scope.msIndicators[i].indicator._id )
                if(questionObj){
                    $scope.obj.questions.push({
                        indicator: $scope.msIndicators[i].indicator._id,
                        trait: $scope.msIndicators[i].trait._id,
                        question: questionObj.question,
                        questionId: questionObj._id,
                        traitName: $scope.msIndicators[i].trait.name
                    })
                }else{
                    $scope.obj.questions.push({
                        indicator: $scope.msIndicators[i].indicator._id,
                        trait: $scope.msIndicators[i].trait._id,
                        question: '',
                        traitName: $scope.msIndicators[i].trait.name
                    })
                }

            }
        })
    }
    function QuestionByIndicator(questions, indicator){
        for(var i=0; i< questions.length; i++){
            if(questions[i].indicator == indicator){
                return questions[i]
            }
        }
        return false;
    }
    $scope.findItem = function () {
        if ($scope.obj.subItem1 && $scope.obj.subItem2) {
            pofRestangular.one("objective").one('searchItem').customPOST($scope.obj).then(function (data) {
                if (Array.isArray(data.data)) {
                    if (data.data.length > 0) {
                        $scope.existedItem = data.data[0].itemName;
                        $scope.obj.itemName = ''
                        $scope.obj.questions = []
                        for (var i = 0; i < $scope.msIndicators.length; i++) {
                            $scope.obj.questions.push({
                                indicator: $scope.msIndicators[i].indicator._id,
                                taxonomyCategory: $scope.msIndicators[i].taxonomyCategory._id,
                                trait: $scope.msIndicators[i].trait._id,
                                question: '',
                                taxonomyCategoryName: $scope.msIndicators[i].taxonomyCategory.name,
                                traitName: $scope.msIndicators[i].trait.name
                            })
                        }
                    }
                    else {
                        $scope.obj.itemName = ''
                        $scope.obj.questions = []
                        for (var i = 0; i < $scope.msIndicators.length; i++) {
                            $scope.obj.questions.push({
                                indicator: $scope.msIndicators[i].indicator._id,
                                taxonomyCategory: $scope.msIndicators[i].taxonomyCategory._id,
                                trait: $scope.msIndicators[i].trait._id,
                                question: '',
                                taxonomyCategoryName: $scope.msIndicators[i].taxonomyCategory.name,
                                traitName: $scope.msIndicators[i].trait.name
                            })
                        }
                    }
                }
                else {

                }
            })
        }
    }

    $scope.renderCode = function () {
        $scope.code = ""
        if ($scope.selectedFunctionality1) {
            $scope.code += objFromArr($scope.functionalities, $scope.selectedFunctionality1)
        }
        if ($scope.selectedChar1) {
            $scope.code += objFromArr($scope.chars1, $scope.selectedChar1)
        }
        if ($scope.selectedFunctionality2) {
            $scope.code += objFromArr($scope.functionalities, $scope.selectedFunctionality2)
        }
        if ($scope.selectedChar2) {
            $scope.code += objFromArr($scope.chars2, $scope.selectedChar2)
        }

    }

    $scope.addObjective = function () {
        pofRestangular.one('objective').one($scope.selectedMS).customPOST($scope.obj).then(function (data) {
            initObj()
            $scope.selectedMSChange()
        })
    }

    $scope.updateObjective = function(){
        pofRestangular.one('objective').one($scope.selectedMS).customPUT($scope.obj).then(function (data) {
            initObj()
            $scope.selectedMSChange()
        })
    }

    function objFromArr(arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]._id == id) {
                return arr[i].code
            }
        }
    }

    function getIndicatorFromTrait() {
        for (var i = 0; i < $scope.msIndicators.length; i++) {
            if ($scope.msIndicators[i].trait._id == $scope.objTrait) {
                return $scope.msIndicators[i].indicator._id
            }
        }
    }
})

