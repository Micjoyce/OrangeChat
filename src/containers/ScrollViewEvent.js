import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  FlatList,
  PanResponder,
  ScrollView,
  Platform,
} from 'react-native';

import ScrollContainer from '../components/ScrollContainer';

const { width, height } = Dimensions.get('window');

class ScrollViewTest extends Component {
  constructor(props) {
    super(props);
    const data1 = [];
    for (let i = 0; i < 50; i++) {
      data1.push({
        name: 'data1 ' + i,
        key: i + 'data'
      });
    }
    this.state = {
      data1,
      enableScrollViewScroll: true,
    };

    this.contentOffset = {
      y: 0,
      x: 0,
    }
  }

  componentWillMount() {
    // 1-4步执行一次，5-8步重复执行
    this._outPanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // 第八步
        console.log('第八步 out move start ===--end--===');
        return true;
      },
    });
  }


  renderRow1 = ({item, index}) => {
    return (
      <View key={index} style={{ height: 40, backgroundColor: index % 2 == 0 ? 'red' : 'blue'}}>
        <Text>index + {item.name}</Text>
      </View>
    )
  }


  render() {
    return (
      <View
        {...this._outPanResponder.panHandlers}
        style={{ flex: 1, backgroundColor: 'red' }}
      >
        <View
          style={{ height: 200, backgroundColor: '#ccc' }}
        />
        <ScrollView
          ref="_scrollview"
          scrollEnabled={this.state.enableScrollViewScroll}
          onScroll={this.handleScroll}
          scrollEventThrottle={200}
        >
          {this.state.data1.map((item, index) => {
            return this.renderRow1({item, index})
          })}
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  };
};

// pass Actions creators as props to AllCommentAboutMe
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollViewTest);