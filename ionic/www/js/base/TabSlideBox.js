/*
 * SimplePubSub from https://github.com/mbenford/ngTagsInput/blob/master/src/util.js
 * */
//'use strict';

function SimplePubSub() {
    var events = {};
    return {
        on: function(names, handler) {
            names.split(' ').forEach(function(name) {
                if (!events[name]) {
                    events[name] = [];
                }
                events[name].push(handler);
            });
            return this;
        },
        trigger: function(name, args) {
            angular.forEach(events[name], function(handler) {
                handler.call(null, args);
            });
            return this;
        }
    };
}

angular.module('jv.base')
.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
})
.directive('onSlideTo', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$emit('ngSlideTo', parseInt(attr.onSlideTo, 10));
        }
    };
})
.directive('tabSlideBox', ['$timeout', '$window', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicGesture', '$stateParams',
    function($timeout, $window, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicGesture, $stateParams) {
        //'use strict';
        return {
            restrict : 'A, E, C',
            link : function(scope, element, attrs, ngModel) {
                var ta  = element[0],
                    $ta = element,
                    tabBarEle,
                    slideEles   = ta.querySelectorAll('ion-slide'),
                    activeIndex = 0,
                    prevSlideLeft = 0,
                    prevBarLeft,
                    barWidth,
                    slideStartLeft;

                $ta.addClass('tabbed-slidebox');
                if (attrs.tabsPosition === 'bottom') {
                    $ta.addClass('btm');
                }

                if (ta.querySelector('.tsb-tab-border-bar')) {
                    tabBarEle = ta.querySelector('.tsb-tab-border-bar');
                } else {
                    tabBarEle = angular.element('<div class="tsb-tab-border-bar"></div>')[0];
                    angular.element(ta.querySelector('.tsb-ic-wrp')).append(tabBarEle);
                }

                //Handle multiple slide/scroll boxes
                var handle = ta.querySelector('.slider').getAttribute('delegate-handle');

                var ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
                if (handle) {
                    ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle(handle);
                }

                var ionicScrollDelegate = $ionicScrollDelegate;
                if (handle) {
                    ionicScrollDelegate = ionicScrollDelegate.$getByHandle(handle);
                }

                function renderScrollableTabs() {
                    var iconsDiv = angular.element(ta.querySelector('.tsb-icons')),
                        icons = iconsDiv.find('a'),
                        wrap = iconsDiv[0].querySelector('.tsb-ic-wrp'),
                        totalTabs = icons.length,
                        scrollDiv = wrap.querySelector('.scroll');

                    angular.forEach(icons, function(value, key){
                        var a = angular.element(value);
                        a.on('click', function() {
                            ionicSlideBoxDelegate.slide(key);
                        });

                        if (a.attr('icon-off')) {
                            a.attr('class', a.attr('icon-off'));
                        }
                    });

                    var initialIndex = attrs.tab;
                    //Initializing the middle tab
                    // if (typeof attrs.tab === 'undefined' || (totalTabs <= initialIndex) || initialIndex < 0) {
                    //     initialIndex = Math.floor(icons.length/2);
                    // }

                    //If initial element is 0, set position of the tab to 0th tab
                    if (initialIndex === 0) {
                        setPosition(0);
                    }

                    $timeout(function() {
                        ionicSlideBoxDelegate.slide(initialIndex);
                    }, 0);
                }

                function setPosition(index) {
                    var iconsDiv = angular.element(ta.querySelector('.tsb-icons')),
                        icons = iconsDiv.find('a'),
                        wrap = iconsDiv[0].querySelector('.tsb-ic-wrp'),
                        totalTabs = icons.length,
                        scrollDiv = wrap.querySelector('.scroll'),
                        middle = iconsDiv[0].offsetWidth/2,
                        curEl = angular.element(icons[index]),
                        prvEl = angular.element(iconsDiv[0].querySelector('.active'));

                    if (curEl && curEl.length) {
                        var curElWidth = curEl[0].offsetWidth, curElLeft = curEl[0].offsetLeft;
                        if (prvEl.attr('icon-off')) {
                            prvEl.attr('class', prvEl.attr('icon-off'));
                        } else {
                            prvEl.removeClass('active');
                        }
                        if (curEl.attr('icon-on')) {
                            curEl.attr('class', curEl.attr('icon-on'));
                        }
                        curEl.addClass('active');

                        var leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5);
                        //If tabs are not scrollable
                        if (!scrollDiv) {
                            leftStr = (middle  - (curElLeft) -  curElWidth/2 + 5) + 'px';
                            wrap.style.webkitTransform =  'translate3d(' + leftStr + ',0,0)';
                        } else {
                            //If scrollable tabs
                            var wrapWidth = wrap.offsetWidth;
                            var currentX = Math.abs(getX(scrollDiv.style.webkitTransform));
                            var leftOffset = 100;
                            var elementOffset = 40;
                            //If tabs are reaching right end or left end
                            if (((currentX + wrapWidth) < (curElLeft + curElWidth + elementOffset)) || (currentX > (curElLeft - leftOffset))){
                                if (leftStr > 0) {
                                    leftStr = 0;
                                }
                                //Use this scrollTo, so when scrolling tab manually will not flicker
                                ionicScrollDelegate.scrollTo(Math.abs(leftStr), 0, true);
                            }
                        }
                    }
                }

                function getX(matrix) {
                    matrix = matrix.replace('translate3d(', '');
                    matrix = matrix.replace('translate(', '');
                    return (parseInt(matrix));
                }

                var events = scope.events;
                events.on('slideChange', function(data) {
                    setPosition(data.index);
                    activeIndex = data.index;
                    setActiveState();
                });
                events.on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    renderScrollableTabs();
                });
                events.on('scrollTab', function() {
                    setActiveState();
                });
                events.on('ngSlideTo', function(data) {
                    if (!ta.querySelectorAll('.tsb-icons a').length) {
                        var fn = arguments.callee;
                        $timeout(function() {
                            fn(data);
                        }, 400);
                        return;
                    }
                    ionicSlideBoxDelegate.slide(data.index);
                });

                renderScrollableTabs();

                function getTabSiblings() {
                    var tabEles = ta.querySelectorAll('.tsb-icons a');
                    return {
                        prev  : tabEles[activeIndex - 1] ? tabEles[activeIndex - 1] : null,
                        active: tabEles[activeIndex],
                        next  : tabEles[activeIndex + 1] ? tabEles[activeIndex + 1] : null
                    };
                }

                function setActiveState() {
                    if (!ta.querySelector('.tsb-icons a.active')) {
                        return;
                    }
                    var handle   = ta.querySelector('.scroll-view').getAttribute('delegate-handle'),
                        bounding = ta.querySelector('.tsb-icons a.active').getBoundingClientRect(),
                        left     = $ionicScrollDelegate.$getByHandle(handle).getScrollPosition().left;
                    tabBarEle.style.left  = bounding.left + 'px';
                    tabBarEle.style.width = (bounding.width - 4) + 'px';
                }

                $ionicGesture.on('dragstart', function(e) {
                    var tabSiblings   = getTabSiblings(),
                        barBounding   = tabBarEle.getBoundingClientRect(),
                        slideBounding = slideEles[activeIndex].getBoundingClientRect();
                    prevBarLeft    = barBounding.left;
                    barWidth       = barBounding.width;
                    prevSlideLeft  = slideBounding.left;
                    slideStartLeft = slideBounding.left;
                }, element);

                $ionicGesture.on('drag', function(e) {
                    var tabSiblings = getTabSiblings(),
                        posPropotion,
                        widthPropotion,
                        currBarLeft,
                        slideBounding = slideEles[activeIndex].getBoundingClientRect(),
                        currSlideLeft = slideBounding.left,
                        prevBounding,
                        activeBounding,
                        nextBounding,
                        isMovable = false;

                    // Trigger vertical scrolling of the content.
                    if (currSlideLeft - slideStartLeft === 0) {
                        return;
                    }

                    if (currSlideLeft - prevSlideLeft >= 0) {
                        // The slide is dragged right. The navigation menu is going left.
                        if (tabSiblings.prev && slideBounding.left >= slideStartLeft) {
                            prevBounding   = tabSiblings.prev.getBoundingClientRect();
                            activeBounding = tabSiblings.active.getBoundingClientRect();
                            posPropotion   = prevBounding.width / slideBounding.width;
                            widthPropotion = (prevBounding.width - activeBounding.width) / prevBounding.width;
                            currBarLeft    = prevBarLeft - Math.abs(currSlideLeft - prevSlideLeft) * posPropotion;
                            barWidth       = barWidth + Math.abs(currBarLeft - prevBarLeft) * widthPropotion;
                            if (currBarLeft < prevBounding.left) {
                                isMovable = true;
                            }
                        } else if (tabSiblings.next) {
                            // drag back
                            activeBounding = tabSiblings.active.getBoundingClientRect();
                            nextBounding   = tabSiblings.next.getBoundingClientRect();
                            posPropotion   = activeBounding.width / slideBounding.width;
                            widthPropotion = (activeBounding.width - nextBounding.width) / activeBounding.width;
                            currBarLeft    = prevBarLeft - Math.abs(currSlideLeft - prevSlideLeft) * posPropotion;
                            barWidth       = barWidth + Math.abs(currBarLeft - prevBarLeft) * widthPropotion;
                            if (currBarLeft < activeBounding.left) {
                                isMovable = true;
                            }
                        }
                    } else {
                        // The slide is dragged left. The navigation menu is going right.
                        if (tabSiblings.next && slideBounding.left <= slideStartLeft) {
                            activeBounding = tabSiblings.active.getBoundingClientRect();
                            nextBounding   = tabSiblings.next.getBoundingClientRect();
                            posPropotion   = activeBounding.width / slideBounding.width;
                            widthPropotion = (nextBounding.width - activeBounding.width) / activeBounding.width;
                            currBarLeft    = prevBarLeft + Math.abs(currSlideLeft - prevSlideLeft) * posPropotion;
                            barWidth       = barWidth  + Math.abs(currBarLeft - prevBarLeft) * widthPropotion;
                            if (currBarLeft > nextBounding.left) {
                                isMovable = true;
                            }
                        } else if (tabSiblings.prev) {
                            // drag back
                            prevBounding   = tabSiblings.prev.getBoundingClientRect();
                            activeBounding = tabSiblings.active.getBoundingClientRect();
                            posPropotion   = prevBounding.width / slideBounding.width;
                            widthPropotion = (activeBounding.width - prevBounding.width) / prevBounding.width;
                            currBarLeft    = prevBarLeft + Math.abs(currSlideLeft - prevSlideLeft) * posPropotion;
                            barWidth       = barWidth + Math.abs(currBarLeft - prevBarLeft) * widthPropotion;
                            if ((currBarLeft + barWidth) > slideBounding.width || 
                                currBarLeft > activeBounding.left) {
                                isMovable = true;
                            }
                        }
                    }
                    prevSlideLeft = currSlideLeft;
                    if (!isMovable) {
                        prevBarLeft = currBarLeft;
                        tabBarEle.style.left  = prevBarLeft + 'px';
                        tabBarEle.style.width = (barWidth - 4) + 'px';
                    }
                }, element);

                $ionicGesture.on('dragend', function(e) {
                    setActiveState();
                    isDraggable = false;
                }, element);
            },
            controller : function($scope, $attrs, $element) {
                $scope.events = new SimplePubSub();

                $scope.slideHasChanged = function(index) {
                    $scope.events.trigger('slideChange', {'index': index});
                    $timeout(function() {
                        if ($scope.onSlideMove) {
                            //$scope.onSlideMove({'index': eval(index)});
                            $scope.onSlideMove({'index': index});
                        }
                    }, 100);
                    if(index.toString().length > 1) {

                        index = index.toString().substr(0,1);
                    }
                };

                $scope.scrollTab = function() {
                    $scope.events.trigger('scrollTab');
                };

                $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
                    $scope.events.trigger('ngRepeatFinished', {'event': ngRepeatFinishedEvent});
                });

                $scope.$on('ngSlideTo', function(e, index) {
                    $scope.events.trigger('ngSlideTo', {index: index});
                });

                $scope.$on('slideHasChanged', function(e, data) {
                    $scope.slideHasChanged(data.index);
                });
            }
        };
    }
]);
