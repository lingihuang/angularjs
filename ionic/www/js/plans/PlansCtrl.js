angular.module('jv.plans')
.controller('PlansCtrl',
['$scope',
function($scope) {
	$scope.slideChanged = function(index) {
		$scope.slideHasChanged(index);
	};
}]);
