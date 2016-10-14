/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('dtCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedChar = ''
        pofRestangular.one('dt').customGET().then(function(data){
            $scope.dts = data.data;
        })

        $scope.characteristic = {name: '', description: ''}
    }
    //init()
    $scope.addCharacteristic = function(){
        pofRestangular.one('dt').customPOST($scope.characteristic).then(function(data){
            $scope.characteristics.push($scope.characteristic.name)
            init()
        })
    }
})

