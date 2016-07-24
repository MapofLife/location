angular.module('mol.consensus-map',['mol-consensus-map-templates'])
  .directive('molConsensusMap', ['$http',
    function($http) {
      return {
        restrict: 'E',
        scope: {
          species: '=species',
          width: '=width',
          height: '=height',
          bounds: '=extent'
        },
        templateUrl: 'mol-consensus-map-main.html',
        controller: function($scope,$http) {
          $scope.defaults = {
            scrollWheelZoom: false
          };
          $scope.center = {lat: 0,lng: 0, zoom: 2};

          $scope.layers = {
            baselayers: {
              positron: {
                name: 'Positron',
                type: 'xyz',
                url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                layerOptions: {
                  subdomains: ['a', 'b', 'c'],
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                  continuousWorld: false
                },
                errorTileUrl: '/app/img/blank_tile.png'
              }
            },
            overlays: {}
          };

          $scope.$watch(
            'species.scientificname',
            function(newValue,oldValue) {
              if(newValue) {
                $http({
                  "withCredentials": false,
                  "method": "POST",
                  "url": "https://mol.cartodb.com/api/v1/map/named/consensus_map",
                  "data": {
                     "scientificname": newValue
                  }
                }).then(
                 function(result, status, headers, config) {
                   logging.info(result);
                   $scope.layers.overlays.consensus = {
                      type: "xyz",
                      url: "{0}/api/map/{1}/{z}/{x}/{y}.png"
                        .format(result.cdn_https,result.map),
                      layerOptions: {
                        attribution: '©2014 Map of Life',
                        continuousWorld: false
                      },
                      name: 'consensus',
                      opacity: 0.8,
                      type: 'consensus',
                      errorTileUrl: '/app/img/blank_tile.png'
                    }
                  }
                );
              }
            }
          );
        }
      };
    }
  ]);
