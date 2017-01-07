/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('characteristicCtrl', function ($scope, pofRestangular, Notification) {

    function init() {
        $scope.selectedChar = ''
        $scope.editMode =  false;

        pofRestangular.one('category').customGET().then(function (data) {
            $scope.categories = data.data;
        })
        $scope.characteristic = {name: '', category: ''}
    }
    $scope.selectedCategoryChange = function(){
        pofRestangular.one('characteristic').customGET($scope.characteristic.category).then(function(data){
            $scope.characteristics = data.data;
        })
    }
    init()
    $scope.addCharacteristic = function(){
        pofRestangular.one('characteristic').customPOST($scope.characteristic).then(function(data){
            $scope.characteristics.push($scope.characteristic)
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("characteristic added successfully")
            init()
        })
    }
    $scope.edit = function(char){
        $scope.characteristic = $scope.findById($scope.characteristics,char)
        $scope.editMode =  true;
    }
    $scope.update = function(){
        pofRestangular.one('characteristic').customPUT($scope.characteristic).then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.characteristics.push($scope.characteristic.name)
            Notification.primary("Characteristic updated successfully")
            init()
        })
    }
})

