angular.module('jv.account')
.controller('AccountCtrl',
['$scope',
function($scope) {
	$scope.slideChanged = function(index) {
		$scope.slideHasChanged(index);
	};
}]);
