import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Platform,
  PanResponder,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class ScrollContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableScrollViewScroll: true,
      innerScrollEnable: true,
    };

    this.contentOffset = {
      y: 0,
      x: 0,
    }
  }

  componentWillMount() {
    this._outPanResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        this.setState({ enableScrollViewScroll: true });
      }
    });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        // ios 不需要下面这一句
        if (Platform.OS === 'android') {
          this.setState({ enableScrollViewScroll: false });
        }
        if (this.props.innerListIsTop && this.props.innerListIsTop() && this.state.enableScrollViewScroll === false) {
          this.setState({ enableScrollViewScroll: true });
        }
      }
    })
  }

  handleScroll =  (event) => {
    this.contentOffset = event.nativeEvent.contentOffset
  }

  setActiveTabs = () => {
    this.setState({
      activeList: this.state.activeList === 'list1' ? 'list2' : 'list1',
    });
  }

  
  render() {
    return (
      <View
        {...this._outPanResponder.panHandlers}
      >
        <ScrollView
          ref="_scrollview"
          scrollEnabled={this.state.enableScrollViewScroll}
          onScroll={this.handleScroll}
          scrollEventThrottle={200}
        >
          {this.props.renderHeader && this.props.renderHeader()}
          <View>
            <Text>{this.state.enableScrollViewScroll.toString()}</Text>
          </View>
          <View
            {...this._panResponder.panHandlers}
            style={{
              height: height - 100,
              backgroundColor: 'green',
              borderWidth: 10,
              borderColor: 'grey',
            }}
          >
              {this.props.renderContent && this.props.renderContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}
