/**
 * Created by rajanchaudhary on 10/14/16.
 */

parentOf.controller('daCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedDa = ''
        pofRestangular.one('da').customGET().then(function(data){
            $scope.das = data.data;
        })

        $scope.da = {name: ''}
    }
    init()
    $scope.addDa = function(){
        pofRestangular.one('da').customPOST($scope.da).then(function(data){
            $scope.das.push($scope.da.name)
            init()
        })
    }
})


