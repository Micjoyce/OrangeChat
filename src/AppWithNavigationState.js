/**
 * Created by Roc on 2017/7/4.
 */

import React, { Component } from 'react';
import { BackHandler } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import Routers from './routers';
import { setNavigator } from './services/navigator';

class AppWithNavigationState extends Component {
  componentDidMount() {
    this.props.init();
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  render() {
      const { dispatch, nav } = this.props;
      return (
          <Routers ref={nav => { setNavigator(nav); }} navigation={addNavigationHelpers({
              dispatch: dispatch,
              state: nav
          })}
          />
      );
  }
}

import { init } from './modules/app';

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
  };
};

// pass Actions creators as props to AllCommentAboutMe
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    init,
    dispatch // 需要将dispatch 传递进去，this.props.dispatch会为undefined
  }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);