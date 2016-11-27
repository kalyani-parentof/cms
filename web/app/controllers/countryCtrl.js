/**
 * Created by rajanchaudhary on 11/27/16.
 */

parentOf.controller('countryCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedCountry = ''
        pofRestangular.one('country').customGET().then(function (data) {
            $scope.countries = data.data;
        })

        $scope.editMode = false;

        $scope.country = {name: ''}
    }

    init()
    $scope.add = function () {
        pofRestangular.one('country').customPOST($scope.country).then(function (data) {
            $scope.countries.push($scope.country.name)
            Notification.primary("Country added successfully")
            init()
        })
    }

    $scope.edit = function(country){
        $scope.editMode= true;
        $scope.country = country;
    }

    $scope.update = function(){
        pofRestangular.one('country').customPUT($scope.country).then(function (data) {
            Notification.primary("country updated successfully")
            init()
        })
    }
})