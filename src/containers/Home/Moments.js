import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Animated,
} from 'react-native';


class Moments extends Component {
  constructor() {
    super();
    this.scale = new Animated.Value(0);
    this.scale1 = new Animated.Value(20);
  }
  goToChatDetail = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('ChatRoom', { user: 'Lucy' })
    }
  }
  gotoSectionList = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('SectionsList')
    }
  }
  gotoInteractable = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('Interactable')
    }
  }
  InterHeader = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('InterHeader')
    }
  }
  Interexample = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('Interexample')
    }
  }

  animate = () => {
		Animated.sequence([
			Animated.timing(
				this.scale,
				{
					toValue: 0,
					duration: 0,
					useNativeDriver: true
				}
			),
			Animated.timing(
				this.scale,
				{
					toValue: 290,
					duration: 2000,
					useNativeDriver: true
				}
			)
		]).start(() => {
			this.animate();
		});
		Animated.sequence([
			Animated.timing(
				this.scale1,
				{
					toValue: 20,
					duration: 0,
					useNativeDriver: true
				}
			),
			Animated.timing(
				this.scale1,
				{
					toValue: 290,
					duration: 2000,
					useNativeDriver: true
				}
			)
		]).start(() => {
		});
	}
  render() {
    return (
      <View>
        <Text>
          Moments
        </Text>
        <Button
            onPress={this.goToChatDetail}
            title={'go to chat detail'}
          >
        </Button>
        <Button
            onPress={this.gotoSectionList}
            title={'go to news SectionList'}
          >
        </Button>
        <Button
            onPress={this.animate}
            title={'go to news SectionList'}
          >
        </Button>
        <Button
            onPress={this.gotoInteractable}
            title={'go to news gotoInteractable'}
          >
        </Button>
        <Button
            onPress={this.InterHeader}
            title={'go to news InterHeader'}
          >
        </Button>
        <Button
            onPress={this.Interexample}
            title={'go to news Interexample'}
          >
        </Button>
        <View
          style={{
            height: 10,
            width: 300,
            backgroundColor: '#eee',
            flexDirection: 'row',
          }}
        >
          <Animated.View
            style={{
              width: 10,
              height: 10,
              backgroundColor: '#ccc',
              transform: [
                { translateX: this.scale }
              ]
            }}
          >
          </Animated.View>
          <Animated.View
            style={{
              width: 10,
              height: 10,
              backgroundColor: '#ccc',
              transform: [
                { translateX: this.scale1 }
              ]
            }}
          >
          </Animated.View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Moments);
