import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ListView,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');
class RecentChats extends Component {
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
      enableScrollViewScroll: true,
      innerScrollEnable: true,
      activeList: 'list1',
    };

    this.contentOffset = {
      y: 0,
      x: 0,
    }
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
          ref="list1"
          data={this.state.data1}
          renderItem={this.renderRow1}
          keyExtractor={this._keyExtractor}
        />
      )
    }
    return (
      <FlatList
        scrollEnabled={this.state.innerScrollEnable}
        ref="list2"
        data={this.state.data2}
        renderItem={this.renderRow2}
        keyExtractor={this._keyExtractor}
      />
    )
  }
  render() {
    return (
      <View
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
        }}
      >
        <ScrollView
          ref="_scrollview"
          scrollEnabled={this.state.enableScrollViewScroll}
          onScroll={this.handleScroll}
          scrollEventThrottle={200}
        >
          <View style={{height: 300, backgroundColor: 'red'}}>
              <Text>header, {this.state.activeList}</Text>
          </View>
          <Button
            onPress={this.setActiveTabs}
            title="change style"
          />
          <View
            style={{ height: height - 100, backgroundColor: 'green'}}
            onStartShouldSetResponderCapture={() => {
              console.log(this.contentOffset.y);
              // ios 不需要下面这一句
              if (Platform.OS === 'android') {
                this.setState({ enableScrollViewScroll: false });
              }
              if (this.refs[this.state.activeList] && this.refs[this.state.activeList]._listRef._scrollMetrics.offset === 0 && this.state.enableScrollViewScroll === false) {
                this.setState({ enableScrollViewScroll: true });
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentChats);