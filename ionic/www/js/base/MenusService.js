angular.module('jv.base')
.service('MenusService',
[function() {
	function getMenuList() {
		return [
            {
				name    : 'Recipes',
				href    : '#/app/recipes',
				state   : 'app.recipes',
				selected: false,
				submenus: [
                    {
						name    : 'Menu One',
						href    : '#',
						selected: false
                    },
                    {
						name    : 'Menu Two',
						href    : '#',
						selected: false
                    },
                    {
						name    : 'Menu Three',
						href    : '#',
						selected: false
                    }
                ]
            },
            {
				name    : 'Health',
				href    : '#/app/health',
				state   : 'app.health',
				selected: false,
				submenus: [
                    {
						name    : 'Menu One',
						href    : '#',
						selected: false
                    },
                    {
						name    : 'Menu Two',
						href    : '#',
						selected: false
                    },
                    {
						name    : 'Menu Three',
						href    : '#',
						selected: false
                    }
                ]
            },
            {
				name    : 'Plans',
				href    : '#/app/plans',
				state   : 'app.plans',
				selected: false,
				submenus: [
                    {
                      name    : 'Menu One',
                      href    : '#',
                      selected: false
                    },
                    {
                      name    : 'Menu Two',
                      href    : '#',
                      selected: false
                    },
                    {
                      name    : 'Menu Three',
                      href    : '#',
                      selected: false
                    }
                ]
            },
            {
				name    : 'Account',
				href    : '#/app/account',
				state   : 'app.account',
				selected: false,
				submenus: [
                    {
						name    : 'Menu One',
						href    : '#',
						selected: false
                    },
                    {
						name    : 'Menu Two',
						href    : '#',
						selected: false
                    },
                    {
						name    : 'Menu Three',
						href    : '#',
						selected: false
                    }
                ]
            }
        ];
	}

	return{
		getMenuList: getMenuList
	};
}]);
