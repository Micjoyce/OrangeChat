/**
 * Created by Roc on 2017/6/13.
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

import HomeTabs from './HomeTabs';
import ChatRoom from '../containers/ChatRoom';

//安卓端需要加上一個headerRight讓title居中
const headerOptions = {
    headerStyle: { backgroundColor: '#fff' },
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>
};

/**
 * 路由配置中心
 */
const Routers = StackNavigator({
    Home: { screen: HomeTabs, navigationOptions: { headerTitle: 'HomeTabs', ...headerOptions } },
    ChatRoom: { screen: ChatRoom, navigationOptions: { headerTitle: 'ChatRoom', ...headerOptions } },
}, {
    headerMode: 'screen',
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
});

export default Routers;





