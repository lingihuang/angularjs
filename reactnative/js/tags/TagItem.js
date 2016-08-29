import React, {
    Component
} from 'react';

import {
    Animated,
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

class TagItem extends Component {
    static defaultProps = {
        checkboxImg       : require('./images/checkbox.png'),
        checkedCheckboxImg: require('./images/checkbox_checked.png'),
        onPressItem       : () => {}
    };

    static propTypes = {
        onPressItem: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            checkboxImg: this.props.checkboxImg,
            item       : null
        };
    }

    componentWillMount() {
        this.setState({
            item: this.props.item
        });
    }

    handlePressItem(event) {
        let item = this.state.item;
        item.checked = item.checked ? false : true;
        this.setState({
            checkboxImg: item.checked ? this.props.checkedCheckboxImg : this.props.checkboxImg,
            item       : item
        });
        this.props.onPressItem(item);
    }

    render() {
        let itemStyle = [styles.item];
        if (!this.state.item.image) {
            itemStyle.push({width: width / 2});
        }
        return (
            <TouchableOpacity
                onPress={this.handlePressItem.bind(this)}>
                <View style={itemStyle}>
                    <Image style={styles.checkbox} source={this.state.checkboxImg} />
                    <Text style={styles.count}>{this.state.item.count}</Text>
                    {function() {
                        if (this.state.item.image) {
                            return (
                                <View style={styles.main}>
                                    <Image
                                        style={styles.thumbnail}
                                        source={this.state.item.image} />
                                </View>
                            );
                        }
                    }.call(this)}
                    <Text style={styles.title}>{this.state.item.title}</Text>
                    {function() {
                        if (!this.props.open) {
                            return <View style={styles.overlay}></View>;
                        }
                    }.call(this)}
                </View>
            </TouchableOpacity>
        );
    }
}

const column = 4;
const spacing = 2;
let dimensions = Dimensions.get('window');
let width = (dimensions.width - spacing * 3) / column;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#edede8',
        flex           : 1,
        alignItems     : 'center',
        justifyContent : 'center',
        marginLeft     : spacing,
        marginBottom   : spacing,
        padding        : 5,
        position       : 'relative',
        width          : width
    },
    checkbox: {
        height  : 15,
        left    : 2,
        position: 'absolute',
        top     : 2,
        width   : 15
    },
    count: {
        backgroundColor: '#ccc',
        color          : '#000',
        fontSize       : 10,
        padding        : 1,
        paddingLeft    : 2,
        paddingRight   : 2,
        position       : 'absolute',
        right          : 0,
        top            : 0
    },
    main: {
        alignItems    : 'center',
        justifyContent: 'center',
        marginBottom  : 5,
        marginTop     : 15
    },
    thumbnail: {
        height: 70,
        width : 70
    },
    title: {
        color       : '#454545',
        fontSize    : 10,
        marginBottom: 2,
        maxHeight   : 30,
        overflow    : 'hidden',
        textAlign   : 'center'
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        bottom         : 0,
        left           : 0,
        position       : 'absolute',
        right          : 0,
        top            : 0
    }
});

module.exports = TagItem;
