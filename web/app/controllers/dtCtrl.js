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
        $scope.ms = {name: '', description: ''}
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

        pofRestangular.one('functionality').customGET().then(function(data){
            $scope.functionalities = data.data;
        })

        $scope.obj = {item: '',question: '', intervention: '',noOfDay: '', noOfTime: '', intervention2: '',noOfDay2: '', noOfTime2: ''}
    }
    $scope.selectedFunctionality2Change = function(){
        pofRestangular.one('functionality').one($scope.selectedFunctionality2).customGET().then(function(data){

            $scope.chars2 = data.data.characteristic;
            $scope.renderCode()
        })
    }
    $scope.selectedFunctionality1Change = function(){
        pofRestangular.one('functionality').one($scope.selectedFunctionality1).customGET().then(function(data){

            $scope.chars1 = data.data.characteristic;
            $scope.renderCode()
        })
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
        $scope.obj.func1 = $scope.selectedFunctionality1
        $scope.obj.func2 = $scope.selectedFunctionality2
        $scope.obj.char1 = $scope.selectedChar1
        $scope.obj.char2 = $scope.selectedChar2
        $scope.obj.code = $scope.code
        $scope.obj.trait = $scope.objTrait
        $scope.obj.indicator = getIndicatorFromTrait()
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

