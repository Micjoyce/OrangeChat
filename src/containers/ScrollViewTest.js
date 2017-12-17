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
    const data2 = [];
    for (let i = 0; i < 50; i++) {
      data1.push({
        name: 'data1 ' + i,
        key: i + 'data'
      });
      data2.push({
        name: 'data2 ' + i,
        key: i + 'data'
      });
    }
    this.state = {
      data1,
      data2,
      activeList: 'list1',
      enableScrollViewScroll: true,
      innerScrollEnable: true,
    };

    this.contentOffset = {
      y: 0,
      x: 0,
    }
  }

  componentWillMount() {
    // 1-4步执行一次，5-8步重复执行
    this._outPanResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt) => {
        // 第一步
        console.log('第一步, out touch capture');
        return false;
      },
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // 第四步
        console.log('第四步, out touch start');
        return false;
      },
      onMoveShouldSetPanResponderCapture: (evt) => {
        // 第五步
        console.log('第五步 out move capture  ===--start--===');
        return false;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // 第八步
        console.log('第八步 out move start ===--end--===');
        return false;
      },
    });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        // 第二步
        console.log('第二步 inner touch capture');
        return false;
      },
      onStartShouldSetPanResponder: (evt, gestureState) => {
        // 第三步
        console.log('第三步 inner touch start');
        return false;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        // 第六步
        console.log('第六步 inner move capture');
        return false;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // 第七步
        console.log('第七步 inner move start');
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        console.log('开始成为接受事件层： inner onPanResponderGrant');
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('不断触发move事件： inner onPanResponderMove');
      },
      onPanResponderTerminationRequest: () => {
        console.log('onPanResponderTerminationRequest--------------');
        return false;
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

  _keyExtractor = (item) => item.key;

  innerListIsTop = () => {
    if (this[this.state.activeList] && this[this.state.activeList]._listRef._scrollMetrics.offset === 0) {
      return true
    }
    return false
  }

  renderRow1 = ({item, index}) => {
    return (
      <View style={{ height: 40, backgroundColor: index % 2 == 0 ? 'red' : 'blue'}}>
        <Text>index + {item.name}</Text>
      </View>
    )
  }
  renderRow2 = ({item, index}) => {
    return (
      <View style={{ height: 40, backgroundColor: index % 2 == 1 ? 'red' : 'blue'}}>
        <Text>index + {item.name} asdjfsaljfadsfksdkkfa</Text>
      </View>
    )
  }
  
  renderTabs = () => {
    if (this.state.activeList === 'list1') {
      return (
        <FlatList
          scrollEnabled={this.state.innerScrollEnable}
          ref={(c) => this.list1 = c}
          data={this.state.data1}
          renderItem={this.renderRow1}
          keyExtractor={this._keyExtractor}
          onEndReached={() => {
            alert('dd');
          }}
          onEndReachedThreshold={0.5}
        />
      )
    }
    return (
      <FlatList
        scrollEnabled={this.state.innerScrollEnable}
        ref={(c) => this.list2 = c}
        data={this.state.data2}
        renderItem={this.renderRow2}
        keyExtractor={this._keyExtractor}
        onEndReached={() => {
          alert('dd');
        }}
        onEndReachedThreshold={0.5}
      />
    )
  }

  goToScrollViewTest = () => {
    const { navigation } = this.props;
    navigation.navigate('ScrollViewEvent');
  }
  renderHeader = () => {
    return (
      <View style={{height: 300, backgroundColor: '#ccc'}}>
          <Text>header, {this.state.activeList}</Text>
          <Text>header, {this.state.enableScrollViewScroll.toString()}</Text>
          <Button
            onPress={this.goToScrollViewTest}
            title="go to only view container scrollview"
          />
      </View>
    )
  }

  renderButtons = () => {
    return (
      <View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button
          style={{ backgroundColor: '#ccc'}}
          onPress={() => {
            this.setState({
              activeList: 'list1'
            })
          }}
          title={this.state.enableScrollViewScroll.toString() + 'title1'}
        />
        <Button
          style={{ backgroundColor: '#ccc'}}
          onPress={() => {
            this.setState({
              activeList: 'list2'
            })
          }}
          title="title2"
        />
      </View>
    )
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
          {this.renderHeader()}
          {this.renderButtons()}
          <View
            {...this._panResponder.panHandlers}
            style={{
              height: height - 44 - 20 - 40,
              backgroundColor: 'green',
              borderColor: 'grey',
            }}
          >
              {this.renderTabs()}
          </View>
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