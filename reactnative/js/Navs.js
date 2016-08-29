import React, {
    Component
} from 'react';

import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Recipes from './Recipes';
import Health from './Health';
import Plans from './Plans';
import Account from './Account';

class Navs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navs          : ['Recipes', 'Health', 'Plans', 'Account'],
            selectedNavIdx: 0
        };
    }

    renderNavs(value, idx) {
        return (
            <View style={styles.navItem} key={`nav_${value}_${idx}`}>
                <View style={styles.splitter}></View>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={value}
                    accessibilityTraits="button"
                    onPress={() => this.setState({selectedNavIdx: idx})}>
                    <View style={styles.item}>
                        <Text style={[styles.navText, this.state.selectedNavIdx === idx ? styles.activeNavText : null]}>{value}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderContent() {
        switch (this.state.selectedNavIdx) {
            case 0:
            default:
                return <Recipes />;
                break;
            case 1:
                return <Health />;
                break;
            case 2:
                return <Plans />;
                break;
            case 3:
                return <Account />;
                break;
        }
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.navs}>
                    {this.state.navs.map((value, idx) => this.renderNavs(value, idx))}
                </View>
                <View style={styles.navView}>
                    {this.renderContent()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    navs: {
        backgroundColor: '#000',
        flexDirection  : 'row',
        height         : 40,
        marginTop      : (Platform.OS === 'ios') ? 20 : 0,
        marginLeft     : -1,
        paddingTop     : 10,
        paddingBottom  : 10
    },
    navItem: {
        flex         : 1,
        flexDirection: 'row'
    },
    item: {
        borderLeftWidth: 0,
        borderLeftColor: '#999',
        flex           : 1,
        alignItems     : 'center',
        justifyContent : 'center',
        height         : 20,
        paddingLeft    : 20,
        paddingRight   : 20,
    },
    navText: {
        color: '#999'
    },
    activeNavText: {
        color     : '#fff',
        fontWeight: 'bold'
    },
    splitter: {
        backgroundColor: '#999',
        height         : 20,
        width          : 1
    },
    navView: {
        flex: 1
    }
});

module.exports = Navs;