angular.module('jv.health')
.controller('HealthCtrl',
['$scope',
function($scope) {
	$scope.slideChanged = function(index) {
		$scope.slideHasChanged(index);
	};
}]);
