/**
 * Created by Ken on 23/08/2015.
 */
var app = angular.module("Dictionary",  ['ui.router', 'ngRoute', 'ngResource', 'ngMessages', 'ngLodash']);

app.config([ '$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode({       //ngRoute is required for this
        enabled : true,
        requireBase : false
    });
    $urlRouterProvider.otherwise('/');  //default
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl: '/v/home.html',
            controller:'HomeCtrl'
        })
        .state('add',{
        url:'/add',
        templateUrl: '/v/add.html',
        controller:'AddCtrl'
    });
}]);

app.factory('Words', function($resource){
    return $resource('api/dictionary/:id', {id: '@id'}, {
        'put': { method: 'PUT' },
        'get'   : { method: 'GET' },
        'delete': { method: 'DELETE'},
        'remove': {method: 'DELETE'}
    });
});


app.controller('HomeCtrl', function($scope, $rootScope, $state, Words, lodash){
    var _ = lodash;
    $rootScope.PAGE = 'home';
    $scope.words = Words.query();

    $scope.choose = function(_i){
        var ws = $scope.words;
        var w  = _.findWhere(ws, { 'define' : _i});
        $scope.choice = w.definition;
        $scope.querySeach = w.define;
    };

});


app.controller('AddCtrl', function($scope, $rootScope, $state, Words){
    $rootScope.PAGE = 'Add';
    $scope.word={
        define      :   "",
        definition  :   ""
    };
    $scope.submit = function( option ){
        Words.save($scope.word, function( data){
        }, function(err){
            console.log('Error: ', err);
        });
        $scope.word={
            define      :   "",
            definition  :   ""
        };
    }
});

