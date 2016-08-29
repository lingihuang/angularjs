import React, {
    Component
} from 'react';

import {
	Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class Tabs extends Component {
	constructor(props) {
        super(props);
        this.state = {
			selectedTabIdx: 0
        };
    }

    handlePressItem(idx) {
    	this.setState({
    		selectedTabIdx: idx
    	});
    }

    render() {
    	let tabs = this.props.children;
    	return (
    		<View style={styles.tabs}>
    			<View style={styles.tabNav}>
	    			{tabs.map((item, idx) => {
	    				let tabItemStyle = [styles.tabItem];
	    				if (idx !== this.state.selectedTabIdx) {
	    					tabItemStyle.push({backgroundColor: '#e0e0e0'});
	    				}
						return (
							<TouchableOpacity
								key={`tab_item_${idx}`}
								onPress={this.handlePressItem.bind(this, idx)}>
								<View style={tabItemStyle}>
									<Text>{item.props.title}</Text>
								</View>
							</TouchableOpacity>
						);
					})}
    			</View>
    			{tabs.map((item, idx) => {
    				let tabViewStyle = [styles.tabView];
    				if (idx !== this.state.selectedTabIdx) {
    					tabViewStyle.push({width: 0, height: 0});
    				}
    				return (
    					<View key={`tab_content_${idx}`} style={tabViewStyle}>{item.props.children}</View>
    				);
    			})}
    		</View>
    	);
    }
}

let dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
	tabs: {},
	tabNav: {
		borderTopWidth: 2,
		borderTopColor: '#f0f0f0',
		flex          : 1,
		flexDirection : 'row',
	},
	tabItem: {
		backgroundColor: '#fff',
		alignItems     : 'center',
		justifyContent : 'center',
		paddingBottom  : 6,
		paddingTop     : 6,
		width          : dimensions.width / 2
	},
	tabText: {
		color: '#000',
	},
	tabView: {
		paddingTop: 2
	}
});

module.exports = Tabs;
