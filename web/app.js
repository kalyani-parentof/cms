/**
 * Created by rajanchaudhary on 3/9/16.
 */
var parentOf = angular.module('parentOf', ['restangular', 'ui.router', 'LocalStorageModule', 'cgNotify','ui-notification','ngFileUpload', 'checklist-model','ui.bootstrap']);
parentOf.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        // login screen
        .state('age', {
            url: '/age',
            templateUrl: 'app/views/age.html',
            controller: 'ageCtrl'
        })
        .state('da', {
            url: '/da',
            templateUrl: 'app/views/da.html',
            controller: 'daCtrl'
        }).state('dp', {
            url: '/dp',
            templateUrl: 'app/views/dp.html',
            controller: 'dpCtrl'
        }).state('characteristic', {
            url: '/characteristic',
            templateUrl: 'app/views/characteristic.html',
            controller: 'characteristicCtrl'
        }).state('functionality', {
            url: '/functionality',
            templateUrl: 'app/views/functionality.html',
            controller: 'functionalityCtrl'
        }).state('trait', {
            url: '/trait',
            templateUrl: 'app/views/trait.html',
            controller: 'traitCtrl'
        }).state('taxonomyCategory', {
        url: '/taxonomyCategory',
        templateUrl: 'app/views/taxonomyCategory.html',
        controller: 'taxonomyCategoryCtrl'
    }).state('category', {
            url: '/category',
            templateUrl: 'app/views/category.html',
            controller: 'categoryCtrl'
        }).state('country', {
            url: '/country',
            templateUrl: 'app/views/country.html',
            controller: 'countryCtrl'
        }).state('ses', {
            url: '/ses',
            templateUrl: 'app/views/ses.html',
            controller: 'sesCtrl'
        }).state('gender', {
            url: '/gender',
            templateUrl: 'app/views/gender.html',
            controller: 'genderCtrl'
        }).state('tier', {
            url: '/tier',
            templateUrl: 'app/views/cityTier.html',
            controller: 'tierCtrl'
        }).state('indicator', {
            url: '/indicator',
            templateUrl: 'app/views/indicator.html',
            controller: 'indicatorCtrl'
        }).state('subItem', {
            url: '/subItem',
            templateUrl: 'app/views/subItem.html',
            controller: 'subItemCtrl'
        }).state('research', {
            url: '/research',
            templateUrl: 'app/views/researchProof.html',
            controller: 'researchProofCtrl'
        })
        .state('milestone', {
        url: '/milestone',
        templateUrl: 'app/views/milestone.html',
        controller: 'milestoneCtrl',            // return a Restangular promise, the route will

    })
        .state('devTask', {
            url: '/devTask',
            templateUrl: 'app/views/devTask.html',
            controller: 'devTaskCtrl',            // return a Restangular promise, the route will

        })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/age');

});
parentOf.config(function(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 10000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });
});
parentOf.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('pof');
    localStorageServiceProvider
        .setStorageType('localStorage');
});

parentOf.run(function ($rootScope, $state, $location, localStorageService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

        var loggedIn = localStorageService.get('user');
        // NOT authenticated - wants any private stuff
        //if (!loggedIn && toState.name !== "login" && toState.name !== "register"&& toState.name !== "thanks") {
        //    $state.go('login');
        //    event.preventDefault();
        //    return;
        //}


        // unmanaged
    });
});

parentOf.factory('pofRestangular', ['Restangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl("http://localhost:3301");
        RestangularConfigurer.setDefaultHttpFields({
            timeout: 15000
        });
    });

}]);

parentOf.controller('mainCtrl', function ($scope, Notification) {
$scope.findById = function(arr, id){
    for(var i=0; i< arr.length; i++){
        if(arr[i]._id == id){
            return arr[i];
        }
    }
}
    $scope.errorHandler = function(data){
        if(data.message.errors) {
            Notification.error(data.message.errors.name.message)
        }

    }
    $scope.coreAreas = ["skill", "Behaviour", "emotion", "relationship"]
})
