/**
 * Created by rajanchaudhary on 10/15/16.
 */
parentOf.controller('categoryCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedCategory = ''
        pofRestangular.one('category').customGET().then(function (data) {
            $scope.categories = data.data;
        })
        $scope.editMode = false;

        $scope.category = {name: ''}
    }

    init()
    $scope.addCategory = function () {
        pofRestangular.one('category').customPOST($scope.category).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.categories.push({name: $scope.category.name})
            Notification.primary("category added successfully")
            init()
        })
    }

    $scope.edit = function(category){
        $scope.editMode= true;
        $scope.category = category;
    }

    $scope.update = function(){
        pofRestangular.one('category').customPUT($scope.category).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("category updated successfully")
            init()
        })
    }
})
