/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('functionalityCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedFunc = ''
        pofRestangular.one('functionality').customGET().then(function(data){
            $scope.functionalities = data.data;
        })

        $scope.functionality = {name: '', code: ''}
        $scope.cars = []
    }
    init()
    $scope.addFunctionality = function(){
        pofRestangular.one('functionality').customPOST($scope.characteristic).then(function(data){
            $scope.functionalities.push($scope.functionality.name)
            init()
        })
    }



    $scope.selectedFuncChange = function(){

    }
})

