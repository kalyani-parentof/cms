/**
 * Created by rajanchaudhary on 10/14/16.
 */
parentOf.controller('dpCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.dps = []
        $scope.selectedIndicator = ''
        $scope.selectedDp = ''
        $scope.selectedAge = ''
        pofRestangular.one('age').customGET().then(function(data){
            $scope.ages = data.data;
        })
        pofRestangular.one('indicator').customGET().then(function (data) {
            $scope.indicators = data.data;
        })

        pofRestangular.one('dp').customGET().then(function(data){
            $scope.dps = data.data;
        })

        $scope.dp = {name: '', age: ''}



    }
    init()
    $scope.addDp = function(){
        pofRestangular.one('dp').customPOST($scope.dp).then(function(data){
            $scope.dps.push($scope.dp.name)
            init()
        })
    }
    $scope.addIndicator = function(){
        pofRestangular.one('dp').one('indicator').one($scope.selectedDp).customPOST({indicator: $scope.selectedIndicator}).then(function(data){
            refreshIndicators()

        })
    }
    $scope.removeIndicator = function(id){
        pofRestangular.one('dp').one('indicator').one($scope.selectedDp).one(id._id).customDELETE().then(function(data){
            refreshIndicators()

        })
    }

    $scope.selectedDpChange = function(){
        refreshIndicators()
    }
    function refreshIndicators(){
        pofRestangular.one('dp').one($scope.selectedDp).customGET().then(function(data){

            $scope.dpIndicators = data.data.indicators;
        })
    }
})

