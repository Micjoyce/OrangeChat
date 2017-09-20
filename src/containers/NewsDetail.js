import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';


class NewsDetail extends Component {
  onPress = () => {

  }
  circlePress = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('NewsDetail', { user: 'Lucy' })
    }
  }
  chatPress = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('ChatRoom', { user: 'michael' })
    }
  }
   
  render() {
    return (
      <View>
        <Text>
          NewsDetail
        </Text>
        <Button
          onPress={this.onPress}
          title={'跳转到hometab页面'}
        />
        <Button
          onPress={this.circlePress}
          title={'重复跳转到newDetail页面'}
        />
        <Button
          onPress={this.chatPress}
          title={'重复跳转到chatdetail页面'}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);