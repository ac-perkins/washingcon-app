(function() {
    'use strict';

    angular
      .module('washingcon-app')
      .directive('timedateFormatter', function($filter) {
        return {
          require: 'ngModel',
          link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(data) {
              //convert data from view format to model format
              data = new Date(data).getTime();
              // $filter('date')(data, "short");
              return data; //converted
            });

            ngModelController.$formatters.push(function(data) {
              //convert data from model format to view format
              data = $filter('date')(data, "short");
              // data = new Date(data).getTime();
              return data; //converted
            });
          }
        };
      });

})();
