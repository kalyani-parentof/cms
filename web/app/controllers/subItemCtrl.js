/**
 * Created by rajanchaudhary on 11/27/16.
 */

parentOf.controller('subItemCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.editMode = false;
        $scope.isSearchable = false

        $scope.si = {
            name: '',
            ses: '',
            country: '',
            das: [],
            gender: '',
            tier: '',
            characteristics: [{category: '', characteristic: ''}, {category: '', characteristic: ''}, {
                category: '',
                characteristic: ''
            }],
            functionality: ''
        }
        pofRestangular.one('country').customGET().then(function (data) {
            $scope.countries = data.data;
        })
        pofRestangular.one('da').customGET().then(function (data) {
            $scope.das = data.data;
        })
        pofRestangular.one('category').customGET().then(function (data) {
            $scope.categories = data.data;
        })
        pofRestangular.one('functionality').customGET().then(function (data) {
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

    $scope.publishCategory1 = function () {
        pofRestangular.one('characteristic').customGET($scope.si.characteristics[0].category).then(function(data){
            $scope.characteristics1 = data.data;
        })
    }
    $scope.publishCategory2 = function () {
        pofRestangular.one('characteristic').customGET($scope.si.characteristics[1].category).then(function(data){
            $scope.characteristics2 = data.data;
        })
    }
    $scope.publishCategory3 = function () {
        pofRestangular.one('characteristic').customGET($scope.si.characteristics[2].category).then(function(data){
            $scope.characteristics3 = data.data;
        })
    }
    $scope.add = function () {
        pofRestangular.one("subItem").customPOST($scope.si).then(function (data) {
                if (data.status == "error") {
                    $scope.errorHandler(data)
                    return;
                }
                Notification.primary("sub item created successfully")
                init()
            },
            function () {
                Notification.error("some error occurred")
            })
    }

    $scope.searchSI = function () {
        if ($scope.isSearchable) {
            pofRestangular.one("subItem").one("search").customPOST($scope.si).then(function (data) {
                    $scope.sis = data.data
                },
                function () {
                    Notification.error("some error occurred")
                })
        }
    }
    $scope.delete = function(si) {
        $scope.si = si;
       pofRestangular.one("subItem", si._id).customDELETE().then(function() {
            var index = $scope.subItems.indexOf(subItem);
            if (index > -1) $scope.subItems.splice(index, 1);
            /*   });
      pofRestangular.one("subItem").one(si._id).customDELETE().then(function (data) {
            if (data.status == "error") {
                $scope.errorHandler(data)
                return;
            } */
            Notification.primary("sub item deleted successfully")
            init()
        })
    }
    $scope.edit = function (si) {
        $scope.si = si;
        $scope.isSearchable = false;
        $scope.editMode = true;
    }

    $scope.update = function () {
        pofRestangular.one("subItem").customPUT($scope.si).then(function (data) {
                if (data.status == "error") {
                    $scope.errorHandler(data)
                    return;
                }
                Notification.primary("sub item updated successfully")
                init()
            },
            function () {
                Notification.error("some error occurred")
            })
    }

})