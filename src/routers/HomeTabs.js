import { TabNavigator } from "react-navigation";
import RecentChats from '../containers/Home/RecentChats';
import Contacts from '../containers/Home/Contacts';
import Moments from '../containers/Home/Moments';
import Me from '../containers/Home/Me';

const MainScreenNavigator = TabNavigator({
  Moments: { screen: Moments },
  Contacts: { screen: Contacts },
  RecentChats: { screen: RecentChats },
  Me: { screen: Me },
}, {
  // tabBarComponent:TabBarBottom,
  tabBarPosition:'bottom',
  swipeEnabled:true,
  animationEnabled:false,
  lazy:true,
  initialRouteName:'Moments',
  backBehavior:'none',
});

MainScreenNavigator.navigationOptions = {
  title: 'Orange Chat'
}

export default MainScreenNavigator;