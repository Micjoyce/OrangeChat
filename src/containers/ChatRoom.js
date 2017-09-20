import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';


class ChatRoom extends Component {
  onPress = () => {

  }
  circlePress = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('ChatRoom', { user: 'Lucy' })
    }
  }
  newPress = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('NewsDetail', { user: 'Lucy' })
    }
  }
  render() {
    return (
      <View>
        <Text>
          ChatRoom
        </Text>
        <Button
          onPress={this.onPress}
          title={'跳转到hometab页面'}
        />
        <Button
          onPress={this.circlePress}
          title={'重复跳转到chatroom页面'}
        />
        <Button
          onPress={this.newPress}
          title={'重复跳转到News页面'}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);