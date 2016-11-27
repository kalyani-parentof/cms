/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('characteristicCtrl', function ($scope, pofRestangular, Notification) {

    function init() {
        $scope.selectedChar = ''
        $scope.editMode =  false;
        pofRestangular.one('characteristic').customGET().then(function(data){
            $scope.characteristics = data.data;
        })

        $scope.characteristic = {name: '', code: ''}
    }
    init()
    $scope.addCharacteristic = function(){
        pofRestangular.one('characteristic').customPOST($scope.characteristic).then(function(data){
            $scope.characteristics.push($scope.characteristic.name)
            Notification.primary("Characterstic added successfully")
            init()
        })
    }
    $scope.edit = function(char){
        $scope.characteristic = $scope.findById($scope.characteristics,char)
        $scope.editMode =  true;
    }
    $scope.update = function(){
        pofRestangular.one('characteristic').customPUT($scope.characteristic).then(function(data){
            $scope.characteristics.push($scope.characteristic.name)
            Notification.primary("Characteristic updated successfully")
            init()
        })
    }
})

