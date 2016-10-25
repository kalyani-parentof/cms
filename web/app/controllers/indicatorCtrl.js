/**
 * Created by rajanchaudhary on 10/15/16.
 */
parentOf.controller('indicatorCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedIndicator = ''
        pofRestangular.one('indicator').customGET().then(function (data) {
            $scope.indicators = data.data;
        })

        $scope.indicator = {name: ''}
    }

    init()
    $scope.addIndicator = function () {
        pofRestangular.one('indicator').customPOST($scope.indicator).then(function (data) {
            $scope.indicators.push($scope.indicator.name)
            init()
        })
    }
})