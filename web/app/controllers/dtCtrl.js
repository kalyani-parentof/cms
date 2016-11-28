/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('dtCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedDt = ''
        pofRestangular.one('dt').customGET().then(function(data){
            $scope.dts = data.data;
        })

        $scope.dt = {name: '', description: ''}
    }
    init()
    $scope.addDt = function(){
        console.log($scope.dt)
        pofRestangular.one('dt').customPOST($scope.dt).then(function(data){
            $scope.dts.push($scope.dt)
            init()
        })
    }

    $scope.selectedDtChange = function(){
        initMS()
    }

    //Milestone
    function initMS(){
        $scope.selectedMS = ''
        pofRestangular.one('trait').customGET().then(function (data) {
            $scope.traits = data.data;
            for(var i=0; i< $scope.traits.length; i++){
                $scope.traits.indicator = ""
            }
        })

        $scope.ms = {name: '', description: '', indicators: []}
        pofRestangular.one('dt').one($scope.selectedDt).one("milestone").customGET().then(function(data){
            $scope.milestones = data.data.mileStones;
        })
    }

    $scope.addMS = function(){
        pofRestangular.one('dt').one($scope.selectedDt).one("milestone").customPOST($scope.ms).then(function(data){
            initMS()
            alert(data.data)
        })
    }

    $scope.selectedMSChange = function(){
        $scope.selectedIndicator = ''
        $scope.selectedTrait = ''
       if(!$scope.traits){
           pofRestangular.one('trait').customGET().then(function (data) {
               $scope.traits = data.data;
           })
       }
        if(!$scope.indicators){

            pofRestangular.one('indicator').customGET().then(function (data) {
                $scope.indicators = data.data;
            })
        }
        pofRestangular.one('ms').one($scope.selectedMS).customGET().then(function(data){
            $scope.msIndicators = data.data.indicators
            $scope.objectives = data.data.objectives;

        })
        initObj()
    }

    $scope.addIndicator = function(){
        pofRestangular.one('ms').one($scope.selectedMS).customPOST({trait:$scope.selectedTrait , indicator: $scope.selectedIndicator }).then(function(data){


        })
    }
    $scope.deleteIndicator = function(ind){
        pofRestangular.one('ms').one($scope.selectedMS).one(ind.trait._id).one(ind.indicator._id).customDELETE().then(function(data){
            $scope.selectedMSChange()

        })
    }


    //Objective
    function initObj(){
        $scope.code = ""
        $scope.selectedFunctionality2 = ''
        $scope.selectedFunctionality1 = ''
        $scope.selectedChar1 = ''
        $scope.selectedChar2 = ''
        $scope.objTrait = ''
        $scope.si1 = { ses: '', country: '', gender: '', tier:'', characteristic: '', functionality: ''}
        $scope.si2 = { ses: '', country: '', gender: '', tier:'', characteristic: '', functionality: ''}
        pofRestangular.one('functionality').customGET().then(function(data){
            $scope.functionalities = data.data;
        })
        pofRestangular.one('characteristic').customGET().then(function(data){
            $scope.chars = data.data;
        })
        pofRestangular.one('country').customGET().then(function (data) {
            $scope.countries = data.data;
        })
        pofRestangular.one('da').customGET().then(function(data){
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

        $scope.obj = {item: '',question: '', intervention: '',noOfDay: '', noOfTime: '', intervention2: '',noOfDay2: '', noOfTime2: ''}
    }
    $scope.searchSi2 = function(){

            pofRestangular.one("subItem").one("search").customPOST($scope.si2).then(function(data){
                    $scope.si2s = data.data
                },
                function(){
                    Notification.error("some error occurred")
                })

    }
    $scope.searchSi1 = function(){

        pofRestangular.one("subItem").one("search").customPOST($scope.si1).then(function(data){
                $scope.si1s = data.data
            },
            function(){
                Notification.error("some error occurred")
            })

    }
    $scope.findItem = function(){
        if($scope.obj.subItem1 && $scope.obj.subItem2){
            pofRestangular.one("objective").one('searchItem').customPOST($scope.obj).then(function(data){
                if(Array.isArray( data.data)){
                    if(data.data.length > 0){
                       $scope.existedItem = data.data[0].itemName;
                    }
                    else{
                        $scope.obj.itemName = ''
                        $scope.obj.questions= []
                        for(var i = 0; i< $scope.msIndicators.length; i++){
                            $scope.obj.questions.push({trait : $scope.msIndicators[i].trait._id, question: '', traitName: $scope.msIndicators[i].trait.name})
                        }
                    }
                }
                else{

                }
            })
        }
    }

    $scope.renderCode = function(){
        $scope.code = ""
        if($scope.selectedFunctionality1 ){
            $scope.code += objFromArr($scope.functionalities,$scope.selectedFunctionality1 )
        }
        if($scope.selectedChar1){
            $scope.code += objFromArr($scope.chars1,$scope.selectedChar1 )
        }
        if($scope.selectedFunctionality2 ){
            $scope.code += objFromArr($scope.functionalities,$scope.selectedFunctionality2 )
        }
        if($scope.selectedChar2){
            $scope.code += objFromArr($scope.chars2,$scope.selectedChar2 )
        }

    }

    $scope.addObjective = function(){
        pofRestangular.one('objective').one($scope.selectedMS).customPOST($scope.obj).then(function(data){
            initObj()
        })
    }

    function objFromArr(arr, id){
        for(var i =0; i< arr.length; i++){
            if(arr[i]._id == id){
                return arr[i].code
            }
        }
    }

    function getIndicatorFromTrait(){
        for(var i = 0; i< $scope.msIndicators.length; i++){
            if($scope.msIndicators[i].trait._id == $scope.objTrait){
                return $scope.msIndicators[i].indicator._id
            }
        }
    }
})

