/**
 * Created by Roc on 2017/6/13.
 */
import React from 'react';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {View} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import HomeTabs from './HomeTabs';
import ChatRoom from '../containers/ChatRoom';
import NewsDetail from '../containers/NewsDetail';

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


console.log(MyApp.Home);
export default MyApp;
