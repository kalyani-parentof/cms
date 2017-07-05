/**
 * Created by rajanchaudhary on 10/15/16.
 */
parentOf.controller('indicatorCtrl', function ($scope, pofRestangular,Notification) {
    function init() {
        $scope.selectedIndicator = ''
        pofRestangular.one('indicator').customGET().then(function (data) {
            $scope.indicators = data.data;
        })
        $scope.editMode = false;

        $scope.indicator = {name: ''}
    }

    init()
    $scope.addIndicator = function () {
        pofRestangular.one('indicator').customPOST($scope.indicator).then(function (data) {
            $scope.indicators.push($scope.indicator.name);
            Notification.primary("Indicator added successfully");
            init()
        })
    };
    $scope.edit = function(indicator){
        $scope.editMode= true;
        $scope.indicator = indicator;
    }
    $scope.update = function(){
        pofRestangular.one('indicator').customPUT($scope.indicator).then(function (data) {
            if(data.status == 'error'){
                $scope.errorHandler(data);
                return;
            }
            Notification.primary("Indicator updated successfully");
            init();

        })
    }
    $scope.delete = function (indicator) {
        var id = indicator._id;
        pofRestangular.one('indicator').one(id).customDELETE().then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data);
                return;
            }
            Notification.primary("indicator deleted successfully");
            init();
            return refreshIndicators();

        })

    };
    function refreshIndicators() {
        pofRestangular.one("indicator").customGET().then(function(data){
            $scope.indicators = data.data;
        })

    }
