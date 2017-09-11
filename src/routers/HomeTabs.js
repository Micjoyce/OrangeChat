import { TabNavigator } from "react-navigation";
import RecentChats from '../containers/Home/RecentChats';
import Contacts from '../containers/Home/Contacts';
import Moments from '../containers/Home/Moments';
import Me from '../containers/Home/Me';

const MainScreenNavigator = TabNavigator({
  RecentChats: { screen: RecentChats },
  Contacts: { screen: Contacts },
  Moments: { screen: Moments },
  Me: { screen: Me },
}, {
  // tabBarComponent:TabBarBottom,
  tabBarPosition:'bottom',
  swipeEnabled:true,
  animationEnabled:false,
  lazy:true,
  initialRouteName:'RecentChats',
  backBehavior:'none',
  tabBarOptions:{
    activeTintColor:'blue',
    activeBackgroundColor:'#aaa',
    inactiveTintColor:'black',
    inactiveBackgroundColor:'#ccc',
    showIcon:true,
    showLabel:true,
    upperCaseLabel:false,
    labelStyle:{
        fontSize:12
    },
    indicatorStyle:'green',
    pressColor:'#823453',
    pressOpacity:0.8,
    scrollEnabled:true,
    tabStyle:{
        height:46
    }
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'Orange Chat'
}

export default MainScreenNavigator;