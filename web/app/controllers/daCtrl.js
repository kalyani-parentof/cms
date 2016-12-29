/**
 * Created by rajanchaudhary on 10/14/16.
 */

parentOf.controller('daCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedDa = ''
        $scope.editMode = false;
        $scope.selectedAge = ''
        pofRestangular.one('age').customGET().then(function(data){
            $scope.ages = data.data;
        })
        if(!$scope.da) {
            $scope.da = {name: '', age: ''}
        }
        else{
            $scope.da = {name: ''}
        }
    }
    init()
    $scope.addDa = function(){
        pofRestangular.one('da').customPOST($scope.da).then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.das.push($scope.da)
            init()
        })
    }

    $scope.list = function(){
        pofRestangular.one('da').one($scope.da.age).customGET().then(function(data){
            $scope.das = data.data;
        })
    }

    $scope.edit = function(da){
        $scope.da = da;
        $scope.editMode = true;
    }

    $scope.update = function(){
        pofRestangular.one('da').customPUT($scope.da).then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            init()
        })
    }
})


