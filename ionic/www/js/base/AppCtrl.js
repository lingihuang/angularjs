angular.module('jv.base')
.controller('AppCtrl',
['$scope', '$rootScope', 'MenusService',
function($scope, $rootScope, MenusService) {
    $rootScope.menus = MenusService.getMenuList();
    
    function resetMenu() {
        angular.forEach($rootScope.menus, function (obj, key) {
            obj.selected = false;
            angular.forEach(obj.submenus, function (o, k) {
                o.selected = false;
            });
        });
    }

    function resetSubmenu(mainIdx) {
        angular.forEach($rootScope.menus[mainIdx].submenus, function (item, key) {
            item.selected = false;
        });
    }

    $rootScope.handleMenuClick = function(index) {
        resetMenu();
        $rootScope.menus[index].selected = true;
        $rootScope.menus[index].submenus[0].selected = true;
        $scope.$broadcast('ngSlideTo', 0);
    };

    $rootScope.handleSubmenuClick = function(mainIdx, subIdx) {
        resetSubmenu(mainIdx);
        $rootScope.menus[mainIdx].submenus[subIdx].selected = true;
    };
}]);