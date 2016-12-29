/**
 * Created by rajanchaudhary on 11/27/16.
 */

parentOf.controller('sesCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedCountry = ''
        pofRestangular.one('ses').customGET().then(function (data) {
            $scope.sess = data.data;
        })
        $scope.editMode = false;

        $scope.ses = {name: ''}
    }

    init()
    $scope.add = function () {
        pofRestangular.one('ses').customPOST($scope.ses).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.sess.push($scope.ses.name)
            Notification.primary("SES added successfully")
            init()
        })
    }

    $scope.edit = function(ses){
        $scope.editMode= true;
        $scope.ses = ses;
    }

    $scope.update = function(){
        pofRestangular.one('ses').customPUT($scope.ses).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("SES updated successfully")
            init()
        })
    }
})