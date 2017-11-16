import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { register, insertText } from 'seer-custom-keyboard';

class MyKeyboard extends Component {
  onPress = () => {
    insertText(this.props.tag, 'Hello, world');
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}>
          <Text>Hello, world</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

register('hello', () => MyKeyboard);