/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('characteristicCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedChar = ''
        pofRestangular.one('characteristic').customGET().then(function(data){
            $scope.characteristics = data.data;
        })

        $scope.characteristic = {name: '', code: ''}
    }
    init()
    $scope.addCharacteristic = function(){
        pofRestangular.one('characteristic').customPOST($scope.characteristic).then(function(data){
            $scope.characteristics.push($scope.characteristic.name)
            init()
        })
    }
})

