parentOf.controller('ageCtrl', function ($scope, pofRestangular) {
    function init() {
        $scope.selectedAge = ''
        pofRestangular.one('age').customGET().then(function(data){
            $scope.ages = data.data;
        })

        $scope.age = {name: ''}
    }
    init()
    $scope.addAge = function(){
        pofRestangular.one('age').customPOST($scope.age).then(function(data){
            $scope.ages.push($scope.age.name)
            init()
        })
    }
})
