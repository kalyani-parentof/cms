/**
 * Created by rajanchaudhary on 3/9/16.
 */
var parentOf = angular.module('parentOf', ['restangular', 'ui.router', 'LocalStorageModule', 'cgNotify']);
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
        }).state('indicator', {
            url: '/indicator',
            templateUrl: 'app/views/indicator.html',
            controller: 'indicatorCtrl'
        })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/age');

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
        RestangularConfigurer.setBaseUrl("http://localhost:3111");
        RestangularConfigurer.setDefaultHttpFields({
            timeout: 15000
        });
    });
}]);

parentOf.controller('mainCtrl', function ($scope) {

})
