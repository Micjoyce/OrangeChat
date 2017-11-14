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
} from 'react-native';

const { width, height } = Dimensions.get('window');
class RecentChats extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push(i);
    }
    console.log(data);
    this.state = {
      dataSource: ds.cloneWithRows(data),
      enableScrollViewScroll: true,
      flag: false,
    };
  }

  renderRow = (item, _, i) => {
    return (
      <View style={{ height: 40, backgroundColor: i % 2 == 0 ? 'red' : 'blue'}}>
        <Text>i + {item}</Text>
      </View>
    )
  }
  renderRow2 = (item, _, i) => {
    return (
      <View style={{ height: 40, backgroundColor: i % 2 == 1 ? 'red' : 'blue'}}>
        <Text>i + {item} asdjfsaljfadsfksdkkfa</Text>
      </View>
    )
  }
  
  renderTabs = () => {
    if (this.state.flag === true) {
      return (
        <View
          style={{height: 500, width, backgroundColor: 'gray'}}
          onStartShouldSetResponderCapture={() => {
            // ios 不需要下面这一句
            // this.setState({ enableScrollViewScroll: false });
            if (this.refs.myList.scrollProperties.offset === 0 && this.state.enableScrollViewScroll === false) {
              this.setState({ enableScrollViewScroll: true });
            }
          }}
        >
            <ListView
              ref="myList"
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
        </View>
      )
    }
    return (
      <View
        style={{height: 500, width, backgroundColor: 'green'}}
        onStartShouldSetResponderCapture={() => {
          // ios 不需要下面这一句
          // this.setState({ enableScrollViewScroll: false });
          if (this.refs.myList1.scrollProperties.offset === 0 && this.state.enableScrollViewScroll === false) {
            this.setState({ enableScrollViewScroll: true });
          }
        }}
      >
          <ListView
            ref="myList1"
            dataSource={this.state.dataSource}
            renderRow={this.renderRow2}
          />
      </View>
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
          scrollEnabled={this.state.enableScrollViewScroll}
        >
          <View style={{height: 300, backgroundColor: 'red'}}>
              <Text>header, {this.state.flag.toString()}</Text>
          </View>
          <Button
            onPress={() => {
              this.setState({
                flag: true
              })
            }}
            title="change style"
          />
          <View style={{ height: 500, flexDirection: 'row'}}>
            {this.renderTabs()}
          </View>
          <View style={{height: 300, backgroundColor: 'red'}}>
              <Text>footer</Text>
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