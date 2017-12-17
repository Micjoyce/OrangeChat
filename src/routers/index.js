/**
 * Created by Roc on 2017/6/13.
 */
import React from 'react';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {View} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import HomeTabs from './HomeTabs';
import ChatRoom from '../containers/ChatRoom';
import ChatRoomTest from '../containers/ChatRoomTest';
import NewsDetail from '../containers/NewsDetail';
import SectionsList from '../containers/SectionsList';
import ScrollViewTest from '../containers/ScrollViewTest';
import ScrollViewEvent from '../containers/ScrollViewEvent';

//安卓端需要加上一個headerRight讓title居中
const headerOptions = {
  headerStyle: {
    backgroundColor: '#fff'
  },
  headerTitleStyle: {
    color: '#333',
    alignSelf: 'center'
  },
  headerTintColor: '#999',
  headerBackTitle: null,
  headerRight: <View style={{
      width: 24
    }}/>
};

/**
 * 路由配置中心
 */
const MyApp = StackNavigator({
  ScrollViewTest: {
    screen: ScrollViewTest,
    navigationOptions: {
      headerTitle: 'ScrollViewTest',
      ...headerOptions
    }
  },
  ScrollViewEvent: {
    screen: ScrollViewEvent,
    navigationOptions: {
      headerTitle: 'ScrollViewEvent',
      ...headerOptions
    }
  },
  Home: {
    screen: HomeTabs,
    navigationOptions: {
      headerTitle: 'HomeTabs',
      ...headerOptions
    }
  },
  ChatRoom: {
    screen: ChatRoom,
    navigationOptions: {
      headerTitle: 'ChatRoom',
      ...headerOptions
    }
  },
  NewsDetail: {
    screen: NewsDetail,
    navigationOptions: {
      headerTitle: 'NewsDetail',
      ...headerOptions
    }
  },
  SectionsList: {
    screen: SectionsList,
    navigationOptions: {
      headerTitle: 'SectionsList',
      ...headerOptions
    }
  },
  ChatRoomTest: {
    screen: ChatRoomTest,
    navigationOptions: {
      headerTitle: 'ChatRoomTest',
      ...headerOptions
    }
  }
}, {
  headerMode: 'screen',
  transitionConfig: () => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})
});

const defaultGetStateForAction = MyApp.router.getStateForAction;

MyApp.router.getStateForAction = (action, state) => {
  if (state && action.routeName === 'ChatRoom') {
    const fr = state.routes[0];
    const routes = [fr, {
      key: action.routeName,
      params: action.params,
      routeName: action.routeName,
    }];
    return {
      ...state,
      routes,
      index: routes.length - 1
    };
  }
  return defaultGetStateForAction(action, state);
};


export default MyApp;
