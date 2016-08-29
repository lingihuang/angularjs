angular.module('jv.base')
.service('TagsService',
['UtilsService', 'ServerService',
function(UtilsService, ServerService) {
    var imgSrc = ['img', 'tags', 'icon_default.jpg'].join('/');

	function getTabList() {
		return ServerService.requestTabList();
	}

	function getCategoryList() {
		var data = ServerService.requestCategoryList(),
			categories = [];
		angular.forEach(data, function(item, key) {
			var subcategories = [];
			angular.forEach(item.suboptions, function(suboption, k) {
				subcategories.push({
                    checked: false,
                    name   : suboption.name,
                    count  : 0,
                    imgSrc : suboption.img ? suboption.img : imgSrc
				});
			});
			categories.push({
                selected     : false,
                checked      : false,
                name         : item.name,
                count        : 0,
                imgSrc       : item.img ? item.img : imgSrc,
                subcategories: subcategories
			});
		});
		return categories;
	}

	function getFilterList() {
		var data = ServerService.requestFilterList(),
			filters = [];
		angular.forEach(data, function(item, key) {
			var subfilters = [];
			angular.forEach(item.suboptions, function(suboption, k) {
				subfilters.push({
                    checked: false,
                    name   : suboption.name,
                    count  : 0,
                    imgSrc : suboption.img ? suboption.img : imgSrc
				});
			});
			filters.push({
                selected  : false,
                checked   : false,
                name      : item.name,
                count     : 0,
                imgSrc    : item.img ? item.img : imgSrc,
                subfilters: subfilters
			});
		});
		return filters;
	}

    /*
    params data
    {
        categories: [
            {
                name         : 'Dresses',
                subcategories: ['Casual', 'Cocktail', 'Formal', 'Maxi']
            }
        ],
        filters   : [
            {
                name      : 'Season',
                subfilters: ['Winter 2015', 'Autumn 2015', 'Summer 2015', 'Spring 2015']
            }
        ]
    }
    */
    function getTagQuery(data) {
        // References: https://wiki.rndmi.com/index.php/Games_Backend#Inventory_APIs
        var tags = '';
        if (data) {
            var obj = {},
                arr = [];
            obj = {
                categories   : [],
                subcategories: [],
                filters      : []
            };
            angular.forEach(data.categories, function(item, key) {
                if (item.name) {
                    obj.categories.push('Category:' + UtilsService.trimSpace(item.name));
                }
                angular.forEach(item.subcategories, function(o, k) {
                    if (o) {
                        obj.subcategories.push('Category:' + UtilsService.trimSpace(o));
                    }
                });
            });
            angular.forEach(data.filters, function(item, key) {
                angular.forEach(item.subfilters, function(o, k) {
                    if (item.name && o) {
                        obj.filters.push(UtilsService.trimSpace(item.name) + ':' + UtilsService.trimSpace(o));
                    }
                });
            });
            if (obj.categories.length) {
                arr.push(obj.categories.join('|'));
            }
            if (obj.subcategories.length) {
                arr.push(obj.subcategories.join('|'));
            }
            if (obj.filters.length) {
                arr.push(obj.filters.join('|'));
            }
            tags = arr.join('/');
        }
        return tags;
    }

	return {
        getTabList     : getTabList,
        getCategoryList: getCategoryList,
        getFilterList  : getFilterList,
        getTagQuery    : getTagQuery
	};
}]);