import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  SectionList,
} from 'react-native';


const { width, height } = Dimensions.get('window');

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class SectionsList extends Component {
  constructor(props) {
    super(props);
    const data1 = [];
    const data2 = [];
    for (let i = 0; i < 103; i++) {
      data1.push({
        name: 'data1 ' + i,
        key: i + 'data'
      });
    }
    for (let i = 0; i < 20; i++) {
      data2.push({
        name: 'data2 ' + i,
        key: i + 'data'
      });
    }
    this.data1 = data1;
    this.data2 = data2;
    this.state = {
      activeList: 'list1',
      sectionData: [
        {renderItem: this.renderRow1, key: 's2', data: this.data1},
      ]
    };

  }



  setActiveTabs = () => {
    if (this.state.activeList === 'list1') {
      this.setState({
        activeList: 'list2',
        sectionData: [
          {renderItem: this.renderRow2, key: 's2', data: this.data2},
        ]
      })
    } else {
      this.setState({
        activeList: 'list1',
        sectionData: [
          {renderItem: this.renderRow1, key: 's1', data: this.data1},
        ]
      })
    }
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
  
  _renderSectionHeader = () => {
    return (
      <View style={{ height: 50, backgroundColor: '#ccc' }}>
        <Text>header</Text>
      </View>
    )
  }

  _renderItemComponent = ({item}) => {
    return  (
      <View style={{ height: 50, backgroundColor: 'blue' }}>
        <Text>_renderItemComponent</Text>
      </View>
    )
  }
  // This is called when items change viewability by scrolling into our out of the viewable area.
  _onViewableItemsChanged = (info) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      console.log('onViewableItemsChanged: ', info.changed.map((v) => (
        {...v, item: '...', section: v.section.key}
      )));
    }
  }
  _pressItem = (index) => {
    pressItem(this, index);
  }

  _ItemSeparatorComponent = () => {
    return (
      <View style={{height: 20, backgroundColor: 'grey'}}>
        <Text>_ItemSeparatorComponent</Text>
      </View>
    )
  }

  _ListHeaderComponent = () => {
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
      <SectionList
        ListHeaderComponent={this._ListHeaderComponent}
        ItemSeparatorComponent={this._ItemSeparatorComponent}
        enableVirtualization
        stickySectionHeadersEnabled
        onRefresh={() => alert('onRefresh: nothing to refresh :P')}
        onViewableItemsChanged={this._onViewableItemsChanged}
        refreshing={false}
        renderItem={this._renderItemComponent}
        renderSectionHeader={this._renderSectionHeader}
        sections={this.state.sectionData}
        viewabilityConfig={VIEWABILITY_CONFIG}
        onEndReached={() => alert('onRefresh: stop')}
        onEndReachedThreshold={0.1}
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionsList);