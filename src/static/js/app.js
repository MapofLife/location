//'use strict';

angular.module('mol.controllers',[]);

angular.module('mol', [
  'mol.filters',
  'mol.services',
  'mol.api',
  'mol.species-images',
  'mol.species-list',
  'mol.species-wiki',
  'mol.species-detail',
  'mol.location-map',
  'mol.loading-indicator',
  'mol.consensus-map',
  'mol.directives',
  //'mol.controllers',
  'ui.bootstrap',
  'ui.select',
  'ui.router',
  'imageHelpers',
  'leaflet-directive',
  'angularResizable',
  'angular-loading-bar',
  'percentage',
  'km2',
  'ngSanitize',
  'ngCookies'
])
.constant('molConfig',{
    "module" : "species", //module name (used in routing)
    "api" : "0.x",
    "base" : angular.element('#mol-asset-base').attr('content'), //static assets base
    "url" :  angular.element('#mol-url').attr('content'),
    "lang" : angular.element('#mol-lang').attr('content'),
    "region" : angular.element('#mol-region').attr('content'),
    "prod":(window.location.hostname!=='localhost') //boolean for MOL production mode
})
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = false;
    //cfpLoadingBarProvider.includeBar = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
  }])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  //send cookies
  $httpProvider.defaults.withCredentials = true;

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state(
      'location',
      {
        templateUrl: 'static/views/location/main.html',
        url: '/',

      }
    )
    .state(
      'location.latlng',
      {
        templateUrl: 'static/views/location/main.html',
        url: '{lat}/{lng}/:taxa'
      }
    )
    .state(
      'location.place',
      {
        templateUrl: 'static/views/location/main.html',
        url: '{placename}/:taxa'
      }
    );

    //Gets rid of the # in the querystring. Wont work on IE
    $locationProvider.html5Mode(true);


});
