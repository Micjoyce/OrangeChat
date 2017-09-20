import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import { NavigationActions } from 'react-navigation'


class ChatRoom extends Component {
  onPress = () => {
    // this.props.navigation.dispatch({
    //   type: "ReplaceCurrentScreen",
    //   routeName: "Home",
    //   key: "Home",
    //   action: NavigationActions.navigate({ routeName: 'Me'})
    // });
    const navigateAction = NavigationActions.navigate({
    
      routeName: 'Home',
    
      params: {},
    
      action: NavigationActions.navigate({ routeName: 'Me'})
    })
    // // this.props.navigation.dispatch(navigateAction)
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [
    //     navigateAction
    //   ]
    // })
    this.props.navigation.dispatch(navigateAction)
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
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>
          ChatRoom {params.user}
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