import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  FlatList,
} from 'react-native';

import ScrollContainer from '../components/ScrollContainer';

const { width, height } = Dimensions.get('window');
class ChatRoom extends Component {
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
    };

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

  renderHeader = () => {
    return (
      <View style={{height: 300, backgroundColor: '#ccc'}}>
          <Text>header, {this.state.activeList}</Text>
          <Button
            onPress={this.setActiveTabs}
            title="change style"
          />
      </View>
    )
  }

  render() {
    return (
      <ScrollContainer
        renderHeader={this.renderHeader}
        renderContent={this.renderTabs}
        innerListIsTop={this.innerListIsTop}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);