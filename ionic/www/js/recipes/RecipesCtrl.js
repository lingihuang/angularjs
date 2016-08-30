angular.module('jv.recipes')
.controller('RecipesCtrl',
['$scope',
function($scope) {
	$scope.slideChanged = function(index) {
		$scope.slideHasChanged(index);
	};
}]);
