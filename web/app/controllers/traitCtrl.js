/**
 * Created by rajanchaudhary on 10/15/16.
 */
parentOf.controller('traitCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedTrait = ''
        pofRestangular.one('trait').customGET().then(function (data) {
            $scope.traits = data.data;
        })
        $scope.editMode = false;

        $scope.trait = {name: ''}
    }

    init()
    $scope.addTrait = function () {
        pofRestangular.one('trait').customPOST($scope.trait).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.traits.push($scope.trait.name)
            Notification.primary("Trait added successfully")
            init()
        })
    }

    $scope.edit = function(trait){
        $scope.editMode= true;
        $scope.trait = trait;
    }

    $scope.update = function(){
        pofRestangular.one('trait').customPUT($scope.trait).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("Trait updated successfully")
            init()
        })
    }
})