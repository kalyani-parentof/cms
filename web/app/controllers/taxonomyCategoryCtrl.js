parentOf.controller('taxonomyCategoryCtrl', function ($scope, pofRestangular, Notification) {
    function init() {
        $scope.selectedTaxonomyCategory = ''
        pofRestangular.one('taxonomyCategory').customGET().then(function (data) {
            $scope.taxonomyCategories = data.data;
        })
        $scope.editMode = false;

        $scope.taxonomyCategory = {name: '', description: ''}
    }

    init()
    $scope.addTaxonomyCategory = function () {
        pofRestangular.one('taxonomyCategory').customPOST($scope.taxonomyCategory).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            $scope.taxonomyCategories.push({name: $scope.taxonomyCategory.name, description: $scope.taxonomyCategory.description})
            Notification.primary("Taxonomy Category added successfully")
            init()
        })
    }

    $scope.edit = function(taxonomyCategory){
        $scope.editMode= true;
        $scope.taxonomyCategory = taxonomyCategory;
    }

    $scope.update = function(){
        pofRestangular.one('taxonomyCategory').customPUT($scope.taxonomyCategory).then(function (data) {
            if(data.status == "error"){
                $scope.errorHandler(data)
                return;
            }
            Notification.primary("Taxonomy Category updated successfully")
            init()
        })
    }
})
