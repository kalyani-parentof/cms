/**
 * Created by rajanchaudhary on 11/27/16.
 */

parentOf.controller('genderCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedGender = ''
        pofRestangular.one('gender').customGET().then(function (data) {
            $scope.genders = data.data;
        })
        $scope.editMode = false;

        $scope.gender = {name: ''}
    }

    init()
    $scope.add = function () {
        pofRestangular.one('gender').customPOST($scope.gender).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.genders.push($scope.gender.name)
            Notification.primary("gender added successfully")
            init()
        })
    }

    $scope.edit = function(gender){
        $scope.editMode= true;
        $scope.gender = gender;
    }

    $scope.update = function(){
        pofRestangular.one('gender').customPUT($scope.gender).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("gender updated successfully")
            init()
        })
    }
    $scope.delete = function (gender) {
        var id = gender._id;
        pofRestangular.one("gender").one(id).customDELETE().then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data);
                return;
            }
            Notification.primary("gender deleted successfully");
            init();
            return refreshGender();

        })

    };
    function refreshGender() {
        pofRestangular.one("gender").customGET().then(function(data){
            $scope.genders = data.data;
        })

    }
});