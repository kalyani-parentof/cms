/**
 * Created by rajanchaudhary on 10/15/16.
 */
parentOf.controller('traitCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedTrait = ''
        pofRestangular.one('trait').customGET().then(function (data) {
            $scope.traits = data.data;
        })

        $scope.trait = {name: ''}
    }

    init()
    $scope.addTrait = function () {
        pofRestangular.one('trait').customPOST($scope.trait).then(function (data) {
            $scope.traits.push($scope.trait.name)
            init()
        })
    }
})