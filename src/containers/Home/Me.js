import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';


class Me extends Component {
  goToChatDetail = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('ChatRoom', { user: 'Lucy' })
    }
  }
  gotoNews = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('NewsDetail', { user: 'Lucy' })
    }
  }

  render() {
    return (
      <View>
        <Text>
          RecentChats
        </Text>
        <Button
          onPress={this.goToChatDetail}
          title={'go to chat detail'}
        >
        </Button>
        <Button
          onPress={this.gotoNews}
          title={'go to news detail'}
        >
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Me);