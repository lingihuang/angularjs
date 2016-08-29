angular.module('jv.base')
.service('UtilsService',
[function() {
	function trimSpace(str) {
        return str.replace(/\s+/g, '');
    }

	return {
		trimSpace: trimSpace
	};
}]);
