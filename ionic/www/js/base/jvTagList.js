angular.module('jv.base')
.directive('jvTagList',
['$rootScope', '$timeout', '$ionicPosition', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicSideMenuDelegate', 'UtilsService', 'TagsService',
function($rootScope, $timeout, $ionicPosition, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate, UtilsService, TagsService) {
    function controller($scope, $element, $attrs, $transclude) {
        var isAllCatsSelected    = true,
            isAllFiltersSelected = true,
            isAllCatsChecked     = true,
            isAllFiltersChecked  = true;
        $scope.isShowSubtag      = false;
        $scope.isShowAction      = true;
        $scope.tabs              = TagsService.getTabList();
        $scope.categories        = TagsService.getCategoryList();
        $scope.filters           = TagsService.getFilterList();
        $scope.selectedTabIdx    = 0;
        $scope.selectedCatIdx    = null;
        $scope.selectedFilterIdx = null;
        $scope.listSubtagIdx     = null;
        $scope.handleClickCategory = {};

        function getListSubtagIdx() {
            var index           = $scope.selectedTabIdx === 0 ? $scope.selectedCatIdx : $scope.selectedFilterIdx,
                listSubtagIdx   = 0,
                totalCount      = $scope.selectedTabIdx === 0 ? $scope.categories.length : $scope.filters.length;
            if (index === null) {
                return;
            }

            listSubtagIdx = Math.floor(index / 4) * 4 + 3;
            if (listSubtagIdx >= totalCount - 1) {
                listSubtagIdx = totalCount - 1;
            }
            return listSubtagIdx;
        }

        function getSelectedTags() {
            var categories = getSelectedCategories(),
                filters    = getSelectedFilters();
            return {categories: categories, filters: filters};
        }

        function getSelectedCategories() {
            isAllCatsChecked = true;
            var categories = [];
            angular.forEach($scope.categories, function(item, key) {
                var subcategories = [],
                    name = item.name.toLowerCase();
                if (name === 'model') {
                    angular.forEach(item.subcategories, function(o, k) {
                        if (o.checked) {
                            subcategories.push(o.name);
                        }
                    });
                    categories.push({
                        name         : item.name,
                        subcategories: subcategories
                    });
                } else {
                    if (item.subcategories[0].checked) {
                        angular.forEach(item.subcategories, function(o, k) {
                            if (o.name.toLowerCase() !== 'all' && o.checked) {
                                subcategories.push(o.name);
                            }
                        });
                    } else {
                        angular.forEach(item.subcategories, function(o, k) {
                            if (o.checked) {
                                subcategories.push(o.name);
                            }
                        });
                    }
                    if (subcategories.length) {
                        categories.push({
                            name         : item.name,
                            subcategories: subcategories
                        });
                    }
                    if (!item.subcategories[0].checked && subcategories.length !== item.subcategories.length - 1) {
                        isAllCatsChecked = false;
                    }
                }
            });
            return isAllCatsChecked ? [] : categories;
        }

        function getSelectedFilters() {
            isAllFiltersChecked = true;
            var filters = [];
            angular.forEach($scope.filters, function(item, key) {
                var subfilters = [];
                if (item.subfilters[0].checked) {
                    angular.forEach(item.subfilters, function(o, k) {
                        if (o.name.toLowerCase() !== 'all' && o.checked) {
                            subfilters.push(o.name);
                        }
                    });
                } else {
                    angular.forEach(item.subfilters, function(o, k) {
                        if (o.checked) {
                            subfilters.push(o.name);
                        }
                    });
                }
                if (subfilters.length) {
                    filters.push({
                        name      : item.name,
                        subfilters: subfilters
                    });
                }
                if (!item.subfilters[0].checked && subfilters.length !== item.subfilters.length - 1) {
                    isAllFiltersChecked = false;
                }
            });
            return isAllFiltersChecked ? [] : filters;
        }

        function resetTags() {
            var data = $scope.selectedTabIdx === 0 ? $scope.categories : $scope.filters;
            angular.forEach(data, function(item) {
                item.checked = false;
            });
            if ($scope.selectedTabIdx === 0) {
                $scope.selectedCatIdx = null;
            } else {
                $scope.selectedFilterIdx = null;
            }
        }

        function clearAllTags() {
            angular.forEach($scope.categories, function(item, key) {
                item.checked = false;
                angular.forEach(item.subcategories, function(o, k) {
                    o.checked = false;
                });
            });

            angular.forEach($scope.filters, function(item, key) {
                item.checked = false;
                angular.forEach(item.subfilters, function(o, k) {
                    o.checked = false;
                });
            });
        }

        function hideSubtags() {
            $scope.isShowSubtag  = false;
            $scope.listSubtagIdx = null;
            $ionicSlideBoxDelegate.enableSlide(true);
        }

        function selectAllTags() {
            angular.forEach($scope.categories, function(item, key) {
                item.checked = true;
                angular.forEach(item.subcategories, function(o, k) {
                    o.checked = true;
                });
            });

            angular.forEach($scope.filters, function(item, key) {
                item.checked = true;
                angular.forEach(item.subfilters, function(o, k) {
                    o.checked = true;
                });
            });

            isAllCatsSelected    = true;
            isAllFiltersSelected = true;
        }

        function deselectAllTags() {
            var data = $scope.selectedTabIdx === 0 ? $scope.categories : $scope.filters;
            angular.forEach(data, function(item, key) {
                item.checked = false;
                if (!angular.isUndefined(item.subcategories)) {
                    angular.forEach(item.subcategories, function(o, k) {
                        o.checked = false;
                    });
                }
                if (!angular.isUndefined(item.subfilters)) {
                    angular.forEach(item.subfilters, function(o, k) {
                        o.checked = false;
                    });
                }
            });
        }

        function selectSubtags() {
            var data = [];
            if ($scope.selectedTabIdx === 0) {
                data = $scope.categories[$scope.selectedCatIdx].subcategories;
            } else {
                data = $scope.filters[$scope.selectedFilterIdx].subfilters;
            }
            angular.forEach(data, function(item, key) {
                item.checked = true;
            });
        }

        function deselectSubtags() {
            var data = [];
            if ($scope.selectedTabIdx === 0) {
                data = $scope.categories[$scope.selectedCatIdx].subcategories;
            } else {
                data = $scope.filters[$scope.selectedFilterIdx].subfilters;
            }
            angular.forEach(data, function(item) {
                item.checked = false;
            });
        }

        function checkScrolling(itemEle) {
            var rfTabsContentEle = itemEle.closest('.jv-tabs-content'),
                scrollContentEle = itemEle.closest('.overflow-scroll'),
                actionsEle       = rfTabsContentEle.closest('.jv-tag-list').querySelector('.actions'),
                listSubtagEle    = null,
                screenHeight     = window.screen.availHeight,
                offset           = $ionicPosition.offset(angular.element(rfTabsContentEle)),
                viewHeight       = screenHeight - offset.top - actionsEle.offsetHeight,
                handleName       = $scope.selectedTabIdx === 0 ? 'categoryListDelegate' : 'filterListDelegate',
                delegate         = $ionicScrollDelegate.$getByHandle(handleName),
                listSubtagHeight = 0,
                position         = delegate.getScrollPosition(),
                top              = 0;
            $timeout(function() {
                listSubtagEle = rfTabsContentEle.querySelector('.col .list-subtag.active');
                if (listSubtagEle && (listSubtagEle.offsetTop + listSubtagEle.offsetHeight > position.top + viewHeight)) {
                    top = listSubtagEle.offsetTop + listSubtagEle.offsetHeight + position.top - viewHeight + 2;
                    delegate.scrollTo(0, top);
                }
            }, 500);
        }

        function updateCounts(from, tags) {
            var queryString = '';
            if (tags.categories.length || tags.filters.length) {
                queryString = TagsService.getTagQuery(tags);
            }

            if (from === 'all') {
                //InventoriesService.getCountForAllInventories({tags: queryString}, processCounts);
            } else if (from === 'me') {
                //InventoriesService.getCountForMyInventories({tags: queryString}, processCounts);
            }
        }

        function processCounts(items) {
            if (!items.length) {
                angular.forEach($scope.categories, function(item, key) {
                    item.count = 0;
                });
                angular.forEach($scope.filters, function(item, key) {
                    item.count = 0;
                });
                return;
            }

            angular.forEach(items, function(item, key) {
                var category = item.category.toLowerCase(),
                    counts   = item.counts;
                switch(category) {
                    case 'category':
                        angular.forEach($scope.categories, function(item, key) {
                            var name = UtilsService.trimSpace(item.name);
                            item.count = counts && counts[name] ? counts[name] : 0;
                        });
                        break;
                    case 'season':
                    case 'color':
                    case 'material':
                    case 'pattern':
                        updateCountForEachFilter(item.counts, category);
                        break;
                }
            });
        }

        function updateCountForEachFilter(counts, name) {
            angular.forEach($scope.filters, function(item, key) {
                if (item.name.toLowerCase() === name) {
                    item.count = 0;
                    angular.forEach(item.subfilters, function(o, k) {
                        var name = UtilsService.trimSpace(o.name);
                        o.count = counts[name] ? counts[name] : 0;
                        item.count += o.count;
                    });
                }
            });
        }

        function updateCountsForCategories() {
            var tags = getSelectedFilters(),
                queryString = '';
            if (tags.length) {
                queryString = TagsService.getTagQuery({filters: tags});
            }

            if ($scope.from === 'all') {
                //InventoriesService.getCountForAllInventories({tags: queryString}, processCountsForCategories);
            } else if ($scope.from === 'me') {
                //InventoriesService.getCountForMyInventories({tags: queryString}, processCountsForCategories);
            }
        }

        function processCountsForCategories(items) {
            if (!items.length) {
                angular.forEach($scope.categories, function(item, key) {
                    item.count = 0;
                });
                return;
            }

            var counts = null;
            angular.forEach(items, function(item, key) {
                if (item.category.toLowerCase() === 'category') {
                    counts = item.counts;
                }
            });
            angular.forEach($scope.categories, function(item, key) {
                if (item.name.toLowerCase() !== 'model') {
                    var name = UtilsService.trimSpace(item.name);
                    item.count = counts && counts[name] ? counts[name] : 0;
                }
            });
        }

        function updateCountsForSubcategories() {
            var category    = $scope.categories[$scope.selectedCatIdx],
                categories  = [],
                filters     = getSelectedFilters(),
                queryString = '';
            categories.push({
                name: category.name
            });
            if (categories.length || filters.length) {
                queryString = TagsService.getTagQuery({categories: categories, filters: filters});
            }
            if ($scope.from === 'all') {
                //InventoriesService.getCountForAllInventories({tags: queryString}, processCountsForSubcategories);
            } else {
                //InventoriesService.getCountForMyInventories({tags: queryString}, processCountsForSubcategories);
            }
        }

        function processCountsForSubcategories(items) {
            var category = $scope.categories[$scope.selectedCatIdx],
                counts   = null;
            if (!items.length) {
                angular.forEach(category.subcategories, function(item, key) {
                    item.count = 0;
                });
                return;
            }
            angular.forEach(items, function(item, key) {
                if (item.category.toLowerCase() === 'category') {
                    counts = item.counts;
                }
            });
            angular.forEach(category.subcategories, function(item, key) {
                var name = UtilsService.trimSpace(item.name);
                item.count = counts && counts[name] ? counts[name] : 0;
            });
        }

        $scope.handleClickTab = function(index) {
            hideSubtags();
            $scope.selectedTabIdx = index;
        };

        $scope.handleClickCategory = function(e, category, catIdx) {
            //turn off side menu
            $ionicSideMenuDelegate.canDragContent(false);
            $rootScope.$broadcast('Tag.onCategoryClicked');
            e.stopPropagation();

            if (isAllCatsSelected) {
                // Check the category players select and deselect other cateogires.
                isAllCatsSelected = false;
                deselectAllTags();
                category.checked = true;
            }

            if ($scope.isShowSubtag && $scope.selectedCatIdx !== catIdx) {
                hideSubtags();
            }

            $scope.selectedCatIdx = catIdx;

            if (category.checked) {
                $ionicSlideBoxDelegate.enableSlide(false);
                var listSubtagIdx = getListSubtagIdx(),
                    handleName    = 'subcategoryListDelegate_' + listSubtagIdx;
                updateCountsForSubcategories();
                $scope.categories[$scope.selectedCatIdx].isAllSelected = true;
                selectSubtags();
                $scope.categories[listSubtagIdx].show = true;
                $scope.isShowSubtag  = true;
                $scope.listSubtagIdx = listSubtagIdx;
                $ionicScrollDelegate.$getByHandle(handleName).scrollTo(0, 0);
                checkScrolling(e.srcElement.parentNode);
            } else {
                deselectSubtags();
                hideSubtags();
            }
        };

        $scope.handleClickSubcategory = function(e, subcategory) {
            e.stopPropagation();

            var category      = $scope.categories[$scope.selectedCatIdx],
                isAllSelected = true;

            if (category.name.toLowerCase() === 'model') {
                deselectSubtags();
                subcategory.checked = true;
                return;
            }

            if (subcategory.name.toLowerCase() === 'all') {
                // Click on the 'All' option.
                category.isAllSelected = true;
                selectSubtags();
                return;
            }

            if (category.isAllSelected) {
                category.isAllSelected = false;
                deselectSubtags();
                subcategory.checked = true;
            }

            angular.forEach(category.subcategories, function(item, key) {
                if (item.name.toLowerCase() !== 'all' && !item.checked) {
                    isAllSelected = false;
                }
            });
            if (isAllSelected) {
                category.isAllSelected = true;
                selectSubtags();
            }
        };

        $scope.handleClickFilter = function(e, filter, filterIdx) {
            e.stopPropagation();

            if (isAllFiltersSelected) {
                isAllFiltersSelected = false;
                deselectAllTags();
                filter.checked = true;
            }

            if ($scope.isShowSubtag && $scope.selectedFilterIdx !== filterIdx) {
                hideSubtags();
            }

            $scope.selectedFilterIdx = filterIdx;

            if (filter.checked) {
                $ionicSlideBoxDelegate.enableSlide(false);
                var listSubtagIdx = getListSubtagIdx(),
                    handleName    = 'subfilterListDelegate_' + listSubtagIdx;
                $scope.filters[$scope.selectedFilterIdx].isAllSelected = true;
                selectSubtags();
                $scope.filters[listSubtagIdx].show = true;
                $scope.isShowSubtag  = true;
                $scope.listSubtagIdx = listSubtagIdx;
                $ionicScrollDelegate.$getByHandle(handleName).scrollTo(0, 0);
                checkScrolling(e.srcElement.parentNode);
                updateCountsForCategories();
            } else {
                deselectSubtags();
                hideSubtags();
            }
        };

        $scope.handleClickSubfilter = function(e, subfilter) {
            e.stopPropagation();

            var filter = $scope.filters[$scope.selectedFilterIdx],
                isAllSelected = true;
            if (subfilter.name.toLowerCase() === 'all') {
                // Click on the 'All' option.
                filter.isAllSelected = true;
                selectSubtags();
                updateCountsForCategories();
                return;
            }

            if (filter.isAllSelected) {
                filter.isAllSelected = false;
                deselectSubtags();
                subfilter.checked = true;
            }

            angular.forEach(filter.subfilters, function(item, key) {
                if (item.name.toLowerCase() !== 'all' && !item.checked) {
                    isAllSelected = false;
                }
            });
            if (isAllSelected) {
                filter.isAllSelected = true;
                selectSubtags();
            }
            updateCountsForCategories();
        };

        $scope.handleSubmit = function() {
            // turn on side menu
            $ionicSideMenuDelegate.canDragContent(true);

            $rootScope.$broadcast("FTUE.FILTER_SUBMIT_CLICKED");

            $scope.isShowSubtag = false;
            $scope.show = false;
            $ionicSlideBoxDelegate.enableSlide(true);
            var tags = getSelectedTags();
            if (tags.categories.length || tags.filters.length) {
                tags = TagsService.getTagQuery(tags);
            } else {
                tags = '';
            }
            $scope.onSubmit(tags);
        };

        $scope.handleSelectAll = function() {
            selectAllTags();
            updateCountsForCategories();
            hideSubtags();
        };

        $scope.handleClearAll = function() {
            clearAllTags();
            updateCountsForCategories();
            hideSubtags();
        };

        $scope.filterAll = function(item) {
            return item.name.toLowerCase() === 'all';
        };

        $scope.filterNotAll = function(item) {
            return item.name.toLowerCase() !== 'all';
        };

        $scope.hasSelectedTags = function() {
            var isAllSelected = true;
            angular.forEach($scope.categories, function(item, key) {
                if (isAllSelected && !item.checked) {
                    isAllSelected = false;
                }
            });
            angular.forEach($scope.filters, function(item, key) {
                if (isAllSelected && !item.checked) {
                    isAllSelected = false;
                }
            });
            return isAllSelected;
        };

        $scope.onInvCategoryTabCreated = function(tabIndex) {
            $rootScope.$broadcast('Event.InvCategoryTabCreated', tabIndex);
        };

        $scope.$watch('show', function(newValue, oldValue) {
            if (newValue && isAllCatsSelected && isAllFiltersSelected) {
                // All categories and filters are selected only when going to the Categories screen in the beginning.
                // Tapping on a category icon or a filter icon will deselect other categories or other filters.
                selectAllTags();
                var tags = getSelectedTags();
                // TODO: Model category is not tagged in any filter we have. Model category needs different filters to apply.
                // Assume there is no filter selected in order to get the count number of Model category from the server.
                updateCounts($scope.from, {categories: [], filters: []});
            }
        });

        $scope.$on('tags.enableCategoryListScroll', function(event, data) {
            $scope.categoryListScrollStyles = data ? {} : { 'overflow-y': 'hidden' };
        });
    }

    function link(scope, element, attrs, controller) {
        element.addClass('jv-tag-list');
    }

	return {
        templateUrl: 'templates/jv_tag_list.html',
        transclude : true,
        restrict   : 'AE',
        replace    : true,
        scope      : {
            show    : '=',
            from    : '=',
            onSubmit: '='
        },
        controller : controller,
        link       : link
	};
}])
.directive('jvTagListRendered',
['$ionicPosition', '$timeout',
function($ionicPosition, $timeout) {
    function link($scope, $element, $attrs, $ctrls) {
        var screenHeight = window.screen.availHeight,
            offset       = $ionicPosition.offset($element);
        $element[0].style.height = screenHeight - offset.top + 'px';
    }
    return {
        restrict: 'A',
        link    : link
    };
}]);
