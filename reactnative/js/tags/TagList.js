import React, {
    Component
} from 'react';

import {
	Animated,
    AppRegistry,
    Dimensions,
    findNodeHandle,
    InteractionManager,
    NativeModules,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

import TagRow from './TagRow';

const UIManager = NativeModules.UIManager;

class TagList extends Component {
	constructor(props) {
        super(props);
        this.scrollViewOffset = {x: 0, y: 0};
		this.scrollViewPos    = null;
		this.animationViewPos = null;
        this.state = {
			selectedRowIdx: null,
			tags          : null
        };
    }

    componentWillMount() {
    	let i 	 = 0,
    		tags = [],
    		arr;
    	
    	this.props.data.map((item, idx) => {
    		if (idx % 4 === 0) {
    			if (arr && arr.length) {
    				tags.push(arr);
    			}
    			arr = [];
    		}
    		arr.push(item);
    		if (idx === this.props.data.length - 1) {
    			tags.push(arr);
    		}
    	});

    	this.setState({
    		tags: tags
    	});
    }

    componentDidMount() {
    	const handle = findNodeHandle(this.refs.tagScrollView);
    	setTimeout(() => {
    		UIManager.measure(handle, (frameX, frameY, width, height, pageX, pageY) => {
                this.scrollViewPos = {
            		frameX: frameX,
                    frameY: frameY,
                    width : width,
                    height: height,
                    pageX : pageX,
                    pageY : pageY
            	};
            });
    	}, 0);
    }

    componentDidUpdate(prevProps, prevState) {
    	InteractionManager.runAfterInteractions(() => {
    		if (this.animationViewPos === null || this.scrollViewPos === null) {
    			return;
    		}

    		if (this.animationViewPos.pageY < this.scrollViewPos.pageY) {
    			this.refs.tagScrollView.scrollTo({
    				x: 0,
    				y: 0
    			});
    		} else if (this.animationViewPos.pageY + this.animationViewPos.height > dimensions.height) {
    			this.refs.tagScrollView.scrollTo({
    				x: 0,
    				y: this.animationViewPos.pageY + this.animationViewPos.height - dimensions.height
    			});
    		}
    	});
    }

    handleContentSizeChange(contentWidth, contentHeight) {
    	
    }

    handleScroll(event) {
    	this.scrollViewOffset = event.nativeEvent.contentOffset;
    }

    onSelect(idx) {
    	this.setState({
    		selectedRowIdx: idx
    	});
    }

    onScroll(position) {
    	this.animationViewPos = position;
    }

    render() {
		return (
			<ScrollView
				ref="tagScrollView"
				style={styles.scrollView}
				scrollEventThrottle={16}
				onContentSizeChange={this.handleContentSizeChange.bind(this)}
				onScroll={this.handleScroll.bind(this)}
				onScrollAnimationEnd={() => {
					
				}}>
				<View style={styles.list}>
					{this.state.tags.map((data, rowIdx) => {
						return (
							<TagRow
								key={`tag_row_${rowIdx}`}
								tags={data}
								rowIdx={rowIdx}
								selectedRowIdx={this.state.selectedRowIdx}
								onSelect={this.onSelect.bind(this)}
								onScroll={this.onScroll.bind(this)} />
						);
					})}
				</View>
			</ScrollView>
		);
    }
}

const column = 4;
const spacing = 2;
let dimensions = Dimensions.get('window');
let width = (dimensions.width - spacing * 3) / column;
let scrollViewHeight = dimensions.height - 40 - 40;

const styles = StyleSheet.create({
	// scrollView: {
	// 	height: scrollViewHeight
	// },
	list: {
		flex         : 1,
		flexDirection: 'column',
		flexWrap     : 'wrap',
		alignItems   : 'flex-start',
		marginLeft   : -spacing
	}
});

module.exports = TagList;
