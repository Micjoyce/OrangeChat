import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
  ScrollView,
  State,
  FlatList,
} from 'react-native-gesture-handler';

import { LoremIpsum } from '../components/Common';

const USE_NATIVE_DRIVER = {
  USE_NATIVE_DRIVER: true,
};


const windowWidth = Dimensions.get('window').width;
const circleRadius = 30;

export class TapOrPan extends Component {
  constructor(props) {
    super(props);
    this._touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    this._translateX = Animated.add(
      this._touchX,
      new Animated.Value(-circleRadius)
    );
    this._onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            x: this._touchX,
          },
        },
      ],
    );
  }

  _onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      // Once tap happened we set the position of the circle under the tapped spot
      this._touchX.setValue(nativeEvent.x);
    }
  };

  render() {
    return (
      <TapGestureHandler
        id="tap"
        waitFor="pan"
        onHandlerStateChange={this._onTapHandlerStateChange}
        shouldCancelWhenOutside>
        <PanGestureHandler
          id="pan"
          minDeltaX={20}
          onGestureEvent={this._onPanGestureEvent}
          shouldCancelWhenOutside>
          <View style={styles.horizontalPan}>
            <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      translateX: this._translateX,
                    },
                  ],
                },
              ]}
            />
          </View>
        </PanGestureHandler>
      </TapGestureHandler>
    );
  }
}

export default class Example extends Component {
  constructor(props) {
    super(props);
    const data1 = [];
    for (let i = 0; i < 50; i++) {
      data1.push({
        name: 'data1 ' + i,
        key: i + 'data'
      });
    }
    this.state = {
      data1,
    };
  }
  _keyExtractor = (item, index) => item.key;
  _renderItem = ({item}) => (
    <View style={{ height: 50, backgroundColor: '#eee' }}>
      <Text>
        {item.name}
      </Text>
    </View>
  );
  render() {
    return (
      <ScrollView waitFor={['tap', 'pan', 'list']}>
        <View style={{ height: 200, backgroundColor: '#ccc' }}>
        </View>
        <TapOrPan />
        <View
          style={{ height: 500 }}
        >
          <FlatList
            id="list"
            data={this.state.data1}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  horizontalPan: {
    backgroundColor: '#f48fb1',
    height: 150,
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    backgroundColor: '#42a5f5',
    borderRadius: circleRadius,
    height: circleRadius * 2,
    width: circleRadius * 2,
  },
});
