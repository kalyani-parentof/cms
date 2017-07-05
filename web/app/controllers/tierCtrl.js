/**
 * Created by rajanchaudhary on 11/27/16.
 */

parentOf.controller('tierCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedTier = ''
        pofRestangular.one('tier').customGET().then(function (data) {
            $scope.tiers = data.data;
        })
        $scope.editMode = false;

        $scope.tier = {name: ''}
    }

    init()
    $scope.add = function () {
        pofRestangular.one('tier').customPOST($scope.tier).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.tiers.push($scope.tier.name)
            Notification.primary("tier added successfully")
            init()
        })
    }

    $scope.edit = function(tier){
        $scope.editMode= true;
        $scope.tier = tier;
    }

    $scope.update = function(){
        pofRestangular.one('tier').customPUT($scope.tier).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("tier updated successfully")
            init()
        })
    }
    $scope.delete = function (tier) {
        var id = tier._id;
        pofRestangular.one("tier").one(id).customDELETE().then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data);
                return;
            }
            Notification.primary("tier deleted successfully");
            init();
            return refreshTier();
        })

    };
    function refreshTier() {
        pofRestangular.one("tier").customGET().then(function (data) {
            $scope.tiers = data.data;

        })

    }
});