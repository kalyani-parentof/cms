/**
 * Created by rajanchaudhary on 10/14/16.
 */

parentOf.controller('daCtrl', function ($scope, pofRestangular,Notification) {
    function init() {
        $scope.selectedDa = ''
        $scope.editMode = false;

        if(!$scope.da) {
            $scope.da = {name: ''}
        }
        else{
            $scope.da = {name: ''}
        }
    }
    init()
    $scope.addDa = function(){
        pofRestangular.one('da').customPOST($scope.da).then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.das.push($scope.da);
            Notification.primary("DA added successfully");
            init()
        })
    }

    $scope.list = function(){
        pofRestangular.one('da').customGET().then(function(data){
            $scope.das = data.data;
        })
    }
    $scope.list()

    $scope.edit = function(da){
        $scope.da = da;
        $scope.editMode = true;
    }

    $scope.update = function(){
        pofRestangular.one('da').customPUT($scope.da).then(function(data){
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            init()
        })
    }
    init()
    $scope.delete= function(da){

        var id = da._id;
        console.log(id);
        pofRestangular.one('da').one(id).customDELETE().then(function(data){
            if (data.status == "error") {
                $scope.errorHandler(data)
                console.log(data);

            }else{
                Notification.primary("da deleted successfully")
                return $scope.list();

            }


        })
    }
    init()
})


