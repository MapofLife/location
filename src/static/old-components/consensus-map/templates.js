angular.module('mol-consensus-map-templates', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("mol-consensus-map-main.html",
    "<leaflet paths=paths markers=markers center=center bounds=bounds width={{width}} layers=layers defaults=defaults height={{height}}></leaflet>");
}]);
