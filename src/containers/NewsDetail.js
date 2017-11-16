import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import './CustomKeyboard';

import { CustomTextInput } from 'seer-custom-keyboard';



class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
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
  onChangeText = (text) => {
    this.setState({
      value: text
    })
  }
   
  render() {
    return (
      <View>
        <Text>
          NewsDetail
        </Text>
        <View>
          <CustomTextInput customKeyboardType="hello" value={this.state.value} onChangeText={this.onChangeText} />
        </View>
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