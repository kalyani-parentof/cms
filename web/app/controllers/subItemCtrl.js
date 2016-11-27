/**
 * Created by rajanchaudhary on 11/27/16.
 */

parentOf.controller('subItemCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.editMode = false;
        $scope.isSearchable = false

        $scope.si = {name: '', ses: '', country: '', das: [], gender: '', tier:'', characteristic: '', functionality: ''}
        pofRestangular.one('characteristic').customGET().then(function(data){
            $scope.characteristics = data.data;
        })
        pofRestangular.one('country').customGET().then(function (data) {
            $scope.countries = data.data;
        })
        pofRestangular.one('da').customGET().then(function(data){
            $scope.das = data.data;
        })
        pofRestangular.one('functionality').customGET().then(function(data){
            $scope.functionalities = data.data;
        })
        pofRestangular.one('gender').customGET().then(function (data) {
            $scope.genders = data.data;
        })
        pofRestangular.one('ses').customGET().then(function (data) {
            $scope.sess = data.data;
        })
        pofRestangular.one('tier').customGET().then(function (data) {
            $scope.tiers = data.data;
        })

    }

    init()


    $scope.add = function(){
        pofRestangular.one("subItem").customPOST($scope.si).then(function(data){
            Notification.primary("sub item created successfully")
                init()
        },
        function(){
            Notification.error("some error occured")
        })
    }

    $scope.searchSI = function(){
        if($scope.isSearchable){
            pofRestangular.one("subItem").one("search").customPOST($scope.si).then(function(data){
                    $scope.sis = data.data
                },
                function(){
                    Notification.error("some error occured")
                })
        }
    }

})