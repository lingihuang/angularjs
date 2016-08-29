/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Reference https://github.com/skv-headless/react-native-scrollable-tab-view
 */

import React, {
    Component
} from 'react';

import {
    AppRegistry,
    StyleSheet
} from 'react-native';

import Navs from './js/Navs';

class reactnative extends Component {
    render() {
        return <Navs />;
    }
}

AppRegistry.registerComponent('reactnative', () => reactnative);
