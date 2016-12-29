/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('functionalityCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedChar = ''
        $scope.selectedFunc = ''
        pofRestangular.one('functionality').customGET().then(function(data){
            $scope.functionalities = data.data;
        })
        pofRestangular.one('characteristic').customGET().then(function(data){
            $scope.characteristics = data.data;
        })

        $scope.functionality = {name: '', code: ''}
        $scope.chars = []

    }
    init()
    $scope.addFunctionality = function(){
        pofRestangular.one('functionality').customPOST($scope.functionality).then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.functionalities.push($scope.functionality.name)
            init()
        })
    }
    $scope.addChar = function(){
        pofRestangular.one('functionality').one('char').one($scope.selectedFunc).customPOST({char: $scope.selectedChar}).then(function(data){
            refreshChars()

        })
    }
    $scope.removeChar = function(id){
        pofRestangular.one('functionality').one('char').one($scope.selectedFunc).one(id._id).customDELETE().then(function(data){
            refreshChars()

        })
    }

    $scope.selectedFuncChange = function(){
        refreshChars()
    }
    function refreshChars(){
        pofRestangular.one('functionality').one($scope.selectedFunc).customGET().then(function(data){

            $scope.chars = data.data.characteristic;
        })
    }
})

