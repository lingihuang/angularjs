angular.module('jv.server')
.factory('ServerService',
[function($scope, $http) {
    function requestTabList() {
        // TODO: request the tab list with api from server.
        return ['Categories', 'Filter'];
    }

    function requestCategoryList(successCallback, errorCallback) {
        var categories = [
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Category",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subcategory",
                        "img" : "img/icon_category.png"
                    }
                ]
            }
        ];
        return categories;
    }

    function requestFilterList(successCallback, errorCallback) {
        var filters = [
            {
                "name"      : "Filter",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Filter",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Filter",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Filter",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    }
                ]
            },
            {
                "name"      : "Filter",
                "img"       : "img/icon_category.png",
                "suboptions": [
                    {
                        "name": "All",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    },
                    {
                        "name": "Subfilter",
                        "img" : "img/icon_category.png"
                    }
                ]
            }
        ];
        return filters;
    }

	return {
		requestTabList     : requestTabList,
		requestCategoryList: requestCategoryList,
		requestFilterList  : requestFilterList
	};
}]);
