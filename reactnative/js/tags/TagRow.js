import React, {
    Component
} from 'react';

import ReactNative, {
    Animated,
    AppRegistry,
    Dimensions,
    findNodeHandle,
    NativeModules,
    ScrollView,
    StyleSheet,
    TouchableOpacity, 
    View
} from 'react-native';

import TagItem from './TagItem';

const UIManager = NativeModules.UIManager;

class TagRow extends Component {
    static defaultProps = {
        tags: null
    };

    static propTypes = {
        tags: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {
            tags       : [],
            selectedTag: null,
            animation  : new Animated.Value()
        };
    }

    componentWillMount() {
        this.setState({
            tags: this.props.tags
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.selectedRowIdx === nextProps.selectedRowIdx || this.props.rowIdx === nextProps.selectedRowIdx) {
            return;
        }

        let initialValue = this.state.maxHeight + this.state.minHeight,
            finalValue   = this.state.minHeight;
        this.state.animation.setValue(initialValue);
        Animated.spring(this.state.animation, {
            toValue: finalValue
        }).start();
        
        this.setState({
            selectedTag: null
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.rowIdx !== nextProps.selectedRowIdx) {
            return;
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.rowIdx !== this.props.selectedRowIdx) {
            return;
        }

        const handle = findNodeHandle(this.refs.animationView);
        setTimeout(() => {
            UIManager.measure(handle, (frameX, frameY, width, height, pageX, pageY) => {
                this.props.onScroll({
                    frameX: frameX,
                    frameY: frameY,
                    width : width,
                    height: height,
                    pageX : pageX,
                    pageY : pageY
                });
            });
        }, 0);
        
    }

    onPressItem(item) {
        let tags = this.state.tags,
            selectedRowIdx = item.checked ? this.props.rowIdx : null,
            selectedTag = item.checked ? item : null,
            initialValue,
            finalValue;

        if (item.checked && this.state.selectedTag) {
            this.setState({
                selectedTag: selectedTag
            });
            this.props.onSelect(selectedRowIdx);
            return;
        }

        tags.map((itm, idx) => {
            if (itm.id === item.id) {
                itm.checked = item.checked;
            }
        });
        
        this.setState({
            selectedTag: selectedTag,
            tags       : tags
        });

        if (this.props.selectedRowIdx !== null || selectedTag !== null) {
            initialValue = item.checked ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
            finalValue   = item.checked ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
            this.state.animation.setValue(initialValue);
            Animated.spring(this.state.animation, {
                toValue: finalValue
            }).start();
        }

        this.props.onSelect(selectedRowIdx);
    }

    setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, {height: this.state.animation}]}
                ref="animationView"
                onLayout={this.setMaxHeight.bind(this)}>
                <View style={styles.row} onLayout={this.setMinHeight.bind(this)}>
                    {this.state.tags.map((item, idx) => {
                        let open = false;
                        if (this.props.selectedRowIdx === null
                            || (this.props.selectedRowIdx === this.props.rowIdx && this.state.selectedTag.id === item.id)) {
                            open = true;
                        }
                        return (
                            <TagItem
                                key={`tag_item_${item.title}_${item.id}`}
                                item={item}
                                open={open}
                                onPressItem={this.onPressItem.bind(this, item)} />
                        );
                    })}
                </View>
                {function () {
                    if (this.state.selectedTag) {
                        return (
                            <ScrollView horizontal={true}>
                                <View style={styles.row}>
                                    {this.state.selectedTag.subtags.map((item, idx) => {
                                        return (
                                            <TagItem
                                                key={`subtag_item_${item.title}_${item.id}`}
                                                item={item}
                                                open="true" />
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        );
                    }
                }.call(this)}
            </Animated.View>
        );
    }
}

const column = 4;
const spacing = 2;
let dimensions = Dimensions.get('window');
let width = (dimensions.width - spacing * 3) / column;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap     : 'wrap'
    },
    row: {
        flexDirection: 'row'
    },
    item: {
        backgroundColor: '#eee',
        marginLeft     : spacing,
        marginBottom   : spacing,
        padding        : 5,
        position       : 'relative',
        width          : width
    },
    checkbox: {
        height  : 15,
        left    : -2,
        position: 'absolute',
        top     : -2,
        width   : 15
    },
    count: {
        backgroundColor: '#ccc',
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
        marginBottom  : 5
    },
    thumbnail: {
        height: 80,
        width : 80
    },
    title: {
        fontSize : 10,
        height   : 15,
        overflow : 'hidden',
        textAlign: 'center'
    }
});

module.exports = TagRow;
