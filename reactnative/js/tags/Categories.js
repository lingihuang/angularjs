import React, {
    Component
} from 'react';

import {
    View
} from 'react-native';

import Tabs from './Tabs';
import TagList from './TagList';

class Categories extends Component {
	constructor(props) {
        super(props);
        this.state = {
			categories: [
        		{
					id     : 0,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 46,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 10
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 24
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 1
						}
					]
        		},
        		{
					id     : 1,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 36,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 7
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 12
						},
						{
							id     : 5,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 6,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		},
        		{
					id     : 2,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 3,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 2
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 1
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		},
        		{
					id     : 3,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 20,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 2
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 8
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 6
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 4
						}
					]
        		},
        		{
					id     : 4,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 7,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 4
						}
					]
        		},
        		{
					id     : 5,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 26,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 5
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 15
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 6
						}
					]
        		},
        		{
					id     : 6,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 2,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 2
						}
					]
        		},
        		{
					id     : 7,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 46,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 10
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 24
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 1
						}
					]
        		},
        		{
					id     : 8,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 36,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 7
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 12
						},
						{
							id     : 5,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 6,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		},
        		{
					id     : 9,
					checked: false,
					title  : 'Category',
					image  : require('./images/icon_category.png'),
					count  : 3,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 2
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 1
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		}
        	],
        	filters: [
        		{
					id     : 0,
					checked: false,
					title  : 'Filter',
					image  : require('./images/icon_category.png'),
					count  : 46,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 10
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 24
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 1
						}
					]
        		},
        		{
					id     : 1,
					checked: false,
					title  : 'Filter',
					image  : require('./images/icon_category.png'),
					count  : 36,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 7
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 12
						},
						{
							id     : 5,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 6,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		},
        		{
					id     : 2,
					checked: false,
					title  : 'Filter',
					image  : require('./images/icon_category.png'),
					count  : 3,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 0
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 2
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 1
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subcategory',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		},
        		{
					id     : 3,
					checked: false,
					title  : 'Filter',
					image  : require('./images/icon_category.png'),
					count  : 20,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 2
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 8
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 6
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 4
						}
					]
        		},
        		{
					id     : 4,
					checked: false,
					title  : 'Filter',
					image  : require('./images/icon_category.png'),
					count  : 36,
					subtags: [
						{
							id     : 0,
							checked: false,
							title  : 'All Items',
							image  : '',
							count  : 0
						},
						{
							id     : 1,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 11
						},
						{
							id     : 2,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 3,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 7
						},
						{
							id     : 4,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 12
						},
						{
							id     : 5,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 3
						},
						{
							id     : 6,
							checked: false,
							title  : 'Subfilter',
							image  : require('./images/icon_category.png'),
							count  : 0
						}
					]
        		}
        	]
        };
    }

    render() {
    	return (
    		<Tabs>
    			<View title={'Categories'.toUpperCase()}>
    				<TagList data={this.state.categories} />
    			</View>
    			<View title={'Filter'.toUpperCase()}>
    				<TagList data={this.state.filters} />
    			</View>
    		</Tabs>
    	);
    }
}

module.exports = Categories;
