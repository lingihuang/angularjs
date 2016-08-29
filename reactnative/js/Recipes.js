import React, {
    Component
} from 'react';

import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScrollableTabView, {
    DefaultTabBar,
    ScrollableTabBar
} from 'react-native-scrollable-tab-view';
import Categories from './tags/Categories';

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    renderTabBar() {
        return (
            <ScrollableTabBar
                backgroundColor="#fff"
                activeTextColor="#333"
                inactiveTextColor="#999"
                underlineColor="#333"
                style={styles.style}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle} />
        );
    }

    render() {
        return (
            <ScrollableTabView
                initialPage={0}
                renderTabBar={this.renderTabBar}
                tabBarPosition="top">
                <ScrollView style={styles.tabView} tabLabel="Menu One">
                    <Categories />
                </ScrollView>
                <ScrollView style={styles.tabView} tabLabel="Menu Two">
                    <Text>Menu Two</Text>
                </ScrollView>
                <ScrollView style={styles.tabView} tabLabel="Menu Three">
                    <Text>Menu Three</Text>
                </ScrollView>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    tabView: {
        backgroundColor: '#fff',
        flex           : 1
    },
    style: {
        borderWidth: 0,
        height     : 40
    },
    tabsContainerStyle: {
        flexDirection : 'row',
        justifyContent: 'flex-start',
        height        : 40,
        alignItems    : 'center',
        marginLeft    : -1,
        paddingTop    : 10,
        paddingBottom : 10
    },
    tabStyle: {
        height         : 20,
        alignItems     : 'center',
        justifyContent : 'center',
        paddingLeft    : 20,
        paddingRight   : 20,
        flex           : 1,
        borderLeftWidth: 1,
        borderLeftColor: '#999'
    }
});

module.exports = Recipes;
